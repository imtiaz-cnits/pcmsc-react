require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 4000;

// 🚀 Start the server and listen on the defined port
app
  .listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error(`❌ Server failed to start: ${err.message}`);
  });
