// External imports
const express = require('express');
const checkLogin = require('../middlewares/token/checkLogin');

// internal imports
const router = express.Router();

router.get('/test', checkLogin, async (req, res) => {
  return res.status(200).json({
    success: 'ok',
    message: 'working',
  });
});

module.exports = router;
