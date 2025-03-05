// 🚀 Importing Required Modules
const express = require('express');
const cors = require('cors');

// 🔗 internal imports
const connectDB = require('./config/database/db');
const authRouter = require('./routes/authRouter');
const testRouter = require('./routes/testRouter');
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler');

// express app intializtion
const app = express();

// 🛡️ global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔌 database connection with mongoose
connectDB();

// basic routing
app.use('/api/v1', testRouter);

// application routes
app.use('/api/v1/auth', authRouter);

// 404 not found handler
app.use(notFoundHandler);

// 🛡️  common custom error handler middleware
app.use(errorHandler);

// Export Express App
module.exports = app;
