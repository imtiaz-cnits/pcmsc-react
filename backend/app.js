// 🚀 Importing Required Modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// 🔗 internal imports
const connectDB = require("./config/database/db");
const authRouter = require("./routes/authRouter");
const testRouter = require("./routes/testRouter");
const academicRouter = require("./routes/academicRouter");
const studentRouter = require("./routes/studentRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// express app initialization
const app = express();

// 🛡️ global middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
    credentials: true, // Allow cookies (if needed)
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// 🔌 database connection with mongoose
connectDB().then((r) => r);

// Root route for basic check
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// basic routing
app.use("/api/v1", testRouter);

// application routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/academic-management", academicRouter);
app.use("/api/v1/student-management", studentRouter);
// app.use('/api/v1/users', userRouter);

// 404 not found handler
app.use(notFoundHandler);

// 🛡️  common custom error handler middleware
app.use(errorHandler);

// Export Express App
module.exports = app;
