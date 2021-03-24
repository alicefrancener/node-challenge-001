const express = require('express');

const router = express.Router();

const Article = require('./../models/articles');

router.get('/', async (req, res) => {
  const articles = await Article.query().select('title');
  res.json(articles);
});

module.exports = router;
