const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express app intializtion
const app = express();

//middleware
app.use(cors());

// database connection with mongoose

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("database connection successful"))
  .catch((error) => console.log(error));

// application routes

module.exports = app;
