const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/auth');

// Protected chat endpoint
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: `Welcome to the chat, ${req.user.username}!` });
});

module.exports = router;
