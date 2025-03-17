const { validationResult } = require("express-validator");

const sanitization = (req, res, next) => {
  // ⚠️ Check if there are any validation errors in the request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsList = errors.array().map((err) => err.msg);
    console.log("errorsList", errorsList);
    return res.status(422).send({
      success: false,
      message: errorsList[0],
    });
  }

  return next();
};

module.exports = sanitization;
