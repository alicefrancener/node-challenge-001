const express = require('express');

const auth = require('./auth');
const articles = require('./articles');
const authors = require('./authors');

const router = express.Router();

router.use(auth);
router.use(articles);
router.use(authors);

module.exports = router;
