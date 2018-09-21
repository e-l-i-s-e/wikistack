const morgan = require('morgan');
const express = require('express');
const app = express();
let bodyParser = require('body-parser');
const { db } = require('./models');

let layout = require('./views/layout');

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/stylesheets'));
// app.use(require('./routes'));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send(layout(''));
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.listen(3000);
