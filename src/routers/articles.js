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
// TODO router.put('/admin/articles', articleController.update);
// TODO router.delete('/admin/articles', articleController.destroy);

module.exports = router;
