const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const { errors } = require('celebrate');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

// EJS Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

module.exports = app;