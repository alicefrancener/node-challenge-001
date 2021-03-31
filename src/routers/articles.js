const express = require('express');
const ArticleController = require('./../controllers/articles');

const ensureLogin = require('./../middlewares/ensureLogin');
const ensureLoginAdmin = require('./../middlewares/ensureLoginAdmin');

const router = express.Router();

const articleController = new ArticleController();

router.get('/articles/', articleController.showByCategory);
router.get('/articles/:id', ensureLogin, articleController.showById);

router.get('/admin/articles', ensureLoginAdmin, articleController.index);
router.post('/admin/articles', ensureLoginAdmin, articleController.create);
router.patch('/admin/articles/:id', ensureLoginAdmin, articleController.update);
router.delete('/admin/articles/:id', ensureLoginAdmin, articleController.destroy);

module.exports = router;
