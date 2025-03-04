require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 4000;

// 🛠️ basic route check
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'ok',
  });
});

// 🚀 Start the server and listen on the defined port
app
  .listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(`❌ Server failed to start: ${err.message}`);
  });
