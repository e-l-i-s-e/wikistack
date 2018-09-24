const express = require('express');
const router = express.Router();
const models = require("../models")
const Page = models.Page;
const User = models.User;
const { userList, userPages } = require('../views')


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users))
  } catch (err) {next(err)}
})


router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    })
    res.send(userPages(user, pages));
  } catch(err){next(err)}
})


module.exports = router;
