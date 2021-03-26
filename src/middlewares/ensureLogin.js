const jwt = require('./../utils/jwt');

const ensureLogin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token);
    const user = { id: decoded.id, email: decoded.email };
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

module.exports = ensureLogin;
