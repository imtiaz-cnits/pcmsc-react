// 🔗 External imports
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw createError(401, 'Authorization header missing!', {
        success: false,
      });
    }

    const token = authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Authentication failed: Invalid token!'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Authentication failed: Token expired!'));
    }
    return next(createError(500, 'Internal Server Error'));
  }
};

module.exports = checkLogin;
