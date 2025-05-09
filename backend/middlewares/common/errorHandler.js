const multer = require("multer");
const createError = require("http-errors");
// ⚠️ Default error handler middleware
function errorHandler(err, req, res, next) {
  console.log("other : ", err);
  if (res.headersSent) {
    return next(err);
  }

  // 🎯 Handle Multer Errors
  if (err instanceof multer.MulterError) {
    console.log("multer error : ", err);
    return res.status(400).json({
      success: false,
      error: "MulterError",
      message: err.message || "File upload failed",
    });
  }

  // 🎯 Handle Custom Errors
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.name || "CustomError",
      message: err.message || "Something went wrong",
    });
  }

  // ⚠️ Handle Unexpected Errors
  console.error("[ERROR]", err); // TO Debugging
  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Internal Server Error. Please try again later.",
  });
}

// 404 not found handler

function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found!"));
}

module.exports = { errorHandler, notFoundHandler };
