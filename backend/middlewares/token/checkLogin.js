// 🔗 External imports
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;

    return next();
  } catch (error) {
    const tokenError = new Error(
      'Authentication failed: Invalid or expired token! ',
    );
    tokenError.status = 401;
    return next(tokenError);
  }
};

module.exports = checkLogin;
