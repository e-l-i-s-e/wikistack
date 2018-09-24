const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./public")))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

app.get('/', function (req, res) {
  res.redirect('/wiki/');
});


  module.exports = app;
