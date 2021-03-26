const express = require('express');
const ArticleController = require('./../controllers/articles');

const router = express.Router();

const articleController = new ArticleController();

router.get('/articles/:id', articleController.showById);
router.get('/articles/', articleController.showByCategory);

router.get('/admin/articles', articleController.index);
// TODO router.post('/admin/articles', articleController.create);
// TODO router.put('/admin/articles', articleController.update);
// TODO router.delete('/admin/articles', articleController.destroy);

module.exports = router;
