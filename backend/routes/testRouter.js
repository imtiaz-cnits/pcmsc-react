// External imports
const express = require('express');

// internal imports
const router = express.Router();

router.get('/test', async (req, res) => {
  return res.status(200).json({
    success: 'ok',
    message: 'working',
  });
});

module.exports = router;
