const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

const authController = new AuthController();

router.post('/sign-up', authController.signup);

module.exports = router;
