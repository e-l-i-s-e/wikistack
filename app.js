const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/stylesheets'));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

const PORT = 3000;

const init = async() => {
  await models.db.sync({force: true})

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  })
}

init();
