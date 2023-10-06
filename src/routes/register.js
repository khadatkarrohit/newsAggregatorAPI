const moment = require('moment');
const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const { Validator } = require('node-input-validator');

/* Register the User */
router.post("/", async (req, res) => {

  const v = new Validator(req.body, {
    first_name: 'required',
    last_name: 'required',
    email: 'required|email',
    password: 'required',
    mobile: 'required'
});

const matched = await v.check();

if (!matched) {
  res.send("Input Validation Failed.");        
}
  
  try {
    
    const { first_name, last_name, email, password, mobile } = req.body;    

    // check if user already exist    
    const userObj = users.filter((el) => el.email == email);

    if (userObj.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const passwordHash = await bcrypt.hashSync(password, salt); 
    
    let curr_max_id = Math.max.apply(null, users.map(itr => itr.id));
    let new_id = curr_max_id + 1; // Auto Increment ID

    // Create user object to store
    const user = {
      first_name: first_name,
      last_name: last_name,
      id: new_id, 
      email: email.toLowerCase(),
      created_at: moment().format(),
      password: passwordHash,
      mobile: mobile                     
  }
    
    await users.push(user) 
    res.status(201).json("Registered Successfully !!!");
  } catch (err) {
    console.log(err);
  }  
});

module.exports = router;