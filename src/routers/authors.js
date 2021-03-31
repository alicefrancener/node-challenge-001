const express = require('express');
const AuthorController = require('./../controllers/authors');

const ensureLoginAdmin = require('./../middlewares/ensureLoginAdmin');

const router = express.Router();

const authorController = new AuthorController();

router.get('/admin/authors', ensureLoginAdmin, authorController.index);
router.get('/admin/authors/:id', ensureLoginAdmin, authorController.show);
router.post('/admin/authors', ensureLoginAdmin, authorController.create);
router.patch('/admin/authors/:id', ensureLoginAdmin, authorController.update);
router.delete('/admin/authors/:id', ensureLoginAdmin, authorController.destroy);

module.exports = router;
