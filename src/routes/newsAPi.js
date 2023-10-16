const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const preferences = require('../data/users_news_preferences.json');
const article = require('../data/article.json');
const axios = require('axios');

// // Create Redis Client
// const createClient = require('redis');

// const client = createClient.createClient();
// client.on("error", (err) => console.log("Redis Client Error", err));
// const connect = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to Redis");
//   } catch (error) {
//     console.log("Error connecting to Redis", error);
//   }
// };
// connect();


/* Get all article witohut user preferences */
router.get('/',  async (req, res, next) => {   
    
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey='your_newAPI_Key'`;
const news_get = await axios({method: 'get',url: url}).then(function (response) {
                return {status: response.data.status, totalResults: response.data.totalResults, articles: response.data.articles}
          });
        res.status(200).send(news_get);
    });

/* Get all article as per search Keyword post by user */
router.post('/search',  async (req, res, next) => {     
    let search = req.body.search

    const url = `http://newsapi.org/v2/everything?q=${search}&apiKey='your_newAPI_Key'`
    const news_get = await axios({method: 'get',url: url}).then(function (response) {
          return {status: response.data.status, totalResults: response.data.totalResults, articles: response.data.articles}
    });    
    res.status(200).send(news_get);    
});

/* Retrieve the news preferences for the logged-in user */
router.get('/preferences',  async (req, res, next) => {     
    let loggedInUserEmail = req.user.email;
    let user_pref = preferences.filter((el) => el.email == loggedInUserEmail)
    res.status(200).send({
        preferences: user_pref[0].preferences
    });    
});

/* Update the news preferences for the logged-in user */
router.put('/preferences',  async (req, res, next) => {     
    let loggedInUserEmail = req.user.email;    
    let user_pref = preferences.filter((el) => el.email == loggedInUserEmail)
    user_pref[0].preferences = req.body.preferences;            
    res.status(200).send('logged-in User Preferances is Updated');    
});

/* Fetch news articles based on the logged-in user's preferences. */
router.get('/news',  async (req, res, next) => {     
    let loggedInUserEmail = req.user.email;    
    let user_pref = preferences.filter((el) => el.email == loggedInUserEmail)
    let searchPref = user_pref[0].preferences
    const url = `http://newsapi.org/v2/everything?q=${searchPref}&apiKey='your_newAPI_Key'`
    const news_get = await axios({method: 'get',url: url}).then(function (response) {
          return {status: response.data.status, totalResults: response.data.totalResults, articles: response.data.articles}
    });    
    res.status(200).send(news_get);    
});

/* Retrieve all read news articles for logged-in user */
router.get('/news/read',  async (req, res, next) => {     
    let loggedInUserEmail = req.user.email;
    let read_article = article.filter((el) => (el.email == loggedInUserEmail && el.read == true))    
    res.status(200).send({
        read_article: read_article
    });    
});

/* Retrieve all favorites news articles for logged-in user */
router.get('/news/favorites',  async (req, res, next) => {     
    let loggedInUserEmail = req.user.email;
    let favorites_article = article.filter((el) => (el.email == loggedInUserEmail && el.favorites == true))
    res.status(200).send({
        favorites_article: favorites_article
    });    
});

/* Mark a news article as read */
router.get('/news/:id/read',  async (req, res, next) => { 
    const { id } = req.params;    
    let loggedInUserEmail = req.user.email;
    let read_article = article.filter((el) => (el.email == loggedInUserEmail && el.id == id)) 
    read_article[0].read = true;   
    res.status(200).send('Article Marked Read for Logged-in User');    
});

/* Mark a news article as favorite */
router.get('/news/:id/favorites',  async (req, res, next) => {  
    const { id } = req.params;   
    let loggedInUserEmail = req.user.email;
    let favorites_article = article.filter((el) => (el.email == loggedInUserEmail && el.id == id))
    favorites_article[0].favorites = true
    res.status(200).send('Article Marked Favorites for Logged-in User');    
});

module.exports = router;