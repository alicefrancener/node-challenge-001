const express = require('express');

const auth = require('./auth');
const articles = require('./articles');

const router = express.Router();

router.use(auth);
router.use(articles);

module.exports = router;
