const { UniqueViolationError, ValidationError } = require('objection');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/users');

class AuthController {
  async signup(req, res, next) {
    const { email, password } = req.body;

    try {
      const passwordPattern = new RegExp(
        '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}'
      );
      if (!passwordPattern.test(password)) {
        const error = new Error(
          'Password must have: at least one digit (0-9), at least one lowercase character (a-z), at least one uppercase character (A-Z), at least 8 characters'
        );
        res.status(400);
        throw error;
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const user = await User.query().insert({ email, password: hashedPass });

      const token = await jwt.sign({ id: user.id, email });
      res.status(201).send({ id: user.id, email, token });
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        error.message = 'Email already registered.';
        res.status(409);
      }
      if (error instanceof ValidationError) {
        res.status(400);
      }

      next(error);
    }
  }

  async signin(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.query().where({ email }).first();
      if (!user) {
        const error = new Error('User is not registered.');
        res.status(403);
        throw error;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const error = new Error('Password incorrect.');
        res.status(403);
        throw error;
      }

      const token = await jwt.sign({ id: user.id, email });
      res.json({ id: user.id, email, token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
