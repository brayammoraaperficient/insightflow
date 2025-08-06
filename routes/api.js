const express = require('express');
const router = express.Router();

// GET /api/docs
router.get('/docs', (req, res) => {
  console.log(`[api/docs]`);
  res.json({ message: 'API documentation endpoint' });
});

module.exports = router;
