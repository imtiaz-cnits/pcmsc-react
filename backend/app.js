// 🚀 Importing Required Modules
const express = require('express');
const cors = require('cors');

// 🔗 internal imports
const connectDB = require('./config/database/db');
const authRouter = require('./routes/authRouter');
const testRouter = require('./routes/testRouter');

// express app intializtion
const app = express();

// 🛡️ global middlewares
app.use(cors());
app.use(express.json());

// 🔌 database connection with mongoose
connectDB();

// basic routing
app.use('/api/v1', testRouter);

// application routes
app.use('/api/v1/auth', authRouter);

// ⚠️ Default error handler middleware
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    status: false,
    message: err.message || 'Internal Server Error',
  });
};

// 🛡️ middleware
app.use(errorHandler);

// Export Express App
module.exports = app;
