require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 4000;

//basic route

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "ok",
  });
});

// listening the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
