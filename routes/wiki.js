const express = require('express');
const router = express.Router();
const models = require("../models")
const Page = models.Page;
const User = models.User;
const { addPage, editPage, wikiPage, main } = require('../views')
//let layout = require('./views/layout');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages))
  } catch (err) { next(err)}
})

router.post('/', async (req, res, next) => {
  const page = new Page(req.body)
  try {
     const [ user, wasCreated] = await User.findOrCreate({
       where: {
         name: req.body.name,
         email: req.body.email
       }
     })
    await page.save();
    page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err){ next(err)}
});

router.get('/add', (req, res) => {
  try {
    res.send(addPage())
  } catch (err) {
    console.log(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) { next(error) }
});

router.post('/:slug', async (req, res, next) => {
   try{
    const [updatedRowCount, updatePages] = await Page.update(req.body, {
      where : {
        slug : req.params.slug
      }
    })
    res.redirect(`wiki/${updatedPages[0].slug}`)
   } catch(err) { next(err)}
})

router.get('/:slug/edit ', async (req, res, next) => {
try{
  const page = await Page.findOne({
    where: {slug = req.params.slug }
  });
  if (page === null) {
    res.sendStatus(404 )
  } else {
    const author = await page.getAuthor();
    res.send(editPage(page, author));
  }
} catch(err) { next(err) }
})

module.exports = router;
