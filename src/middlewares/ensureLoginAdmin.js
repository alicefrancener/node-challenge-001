const jwt = require('./../utils/jwt');
const User = require('./../models/users');

const ensureLoginAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token);
    const user = await User.query().findById(decoded.id);
    if (!user.is_admin) throw Error();
    next();
  } catch (error) {
    res.status(401);
    error.message = 'Please authenticate.';
    next(error);
  }
};

module.exports = ensureLoginAdmin;
