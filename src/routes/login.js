const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');
const jwt = require("jsonwebtoken");

/* Login user */
router.post('/',  async (req, res, next) => {

    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    const matched = await v.check();

    if (!matched) {
        res.send("Input Validation Failed.");        
    }

    try {    
        const { email, password } = req.body;        
    
        const userObj = users.filter((el) => el.email == email);                  
    
        if (email && bcrypt.compareSync(password, userObj[0].password)) {
          
          const token = jwt.sign({ email: email }, '1234567890'); 
    
          res.status(200).json({
            successMsg : "login_successfully",
            token: token
          });
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

module.exports = router;