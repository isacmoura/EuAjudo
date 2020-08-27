const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')
const { errors } = require('celebrate');

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
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'))

module.exports = app;