const express = require('express');

const articles = require('./articles');

const router = express.Router();

router.use('/articles', articles);

module.exports = router;
