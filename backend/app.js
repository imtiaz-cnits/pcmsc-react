const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database/db');

// express app intializtion
const app = express();

// middleware
app.use(cors());

// database connection with mongoose

connectDB();

// application routes

// exports
module.exports = app;
