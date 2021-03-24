const express = require('express');

const articles = require('./articles');

const router = express.Router();

router.use(articles);

module.exports = router;
