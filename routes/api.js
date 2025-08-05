const express = require('express');
const router = express.Router();

// GET /api/docs
router.get('/docs', (req, res) => {
  // TODO: Return API documentation
  res.json({ message: 'API documentation endpoint' });
});

module.exports = router;
