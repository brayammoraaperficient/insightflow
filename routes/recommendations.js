const express = require('express');
const router = express.Router();

// GET /recommendations/:user_id
router.get('/:user_id', (req, res) => {
  // TODO: Generate recommendations
  res.json({ message: 'Recommendations for user', user_id: req.params.user_id });
});

module.exports = router;
