const express = require('express');
const router = express.Router();

// GET /recommendations/:user_id
router.get('/:user_id', (req, res) => {
  console.log(`[recommendations] user_id:`, req.params.user_id);
  res.json({ message: 'Recommendations for user', user_id: req.params.user_id });
});

module.exports = router;
