const express = require('express');
const cors = require('cors');

// internal imports
const connectDB = require('./config/database/db');
const authRouter = require('./routes/authRouter');
const testRouter = require('./routes/testRouter');

// express app intializtion
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection with mongoose

connectDB();

// basic routing
app.use('/api/v1', testRouter);

// routing setup
app.use('/api/v1/auth', authRouter);

// 🚀 Default error handler middleware
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

// middlewar
app.use(errorHandler);

// exports
module.exports = app;
