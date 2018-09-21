const express = require('express');
const router = express.Router();
const { Page } = require('../models')
const { addPage, layout, main } = require('../views')
//let layout = require('./views/layout');

router.get('/add', (req, res) => {
  try {
    res.send(addPage(req.body))
  } catch (err) {
    console.log(err);
  }
});

router.get('/', (req, res, next) => {
  res.send(main());
  // } catch (err) {
  //   res.status(404)
  // }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const page = new Page({
    title: body.title,
    content: body.content
  })
  try {
    await page.save();
    res.redirect('/');
  } catch (err){ next(err)}
});

module.exports = router;
