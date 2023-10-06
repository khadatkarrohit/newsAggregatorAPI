const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const register = require('./routes/register');
const login = require('./routes/login');
const verifyToken = require('./utility/auth');
const newsApi = require('./routes/newsAPi');

const port = process.env.PORT || 8080;

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/register', register);
app.use('/login', login);
app.use('/api/news', verifyToken, newsApi);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;