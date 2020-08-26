const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();

//app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(bodyParser.json());
//app.use(cookieParser()); 
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;