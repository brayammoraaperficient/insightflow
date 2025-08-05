const express = require('express');
const router = express.Router();

// PUT /users/:id/permissions
router.put('/:id/permissions', (req, res) => {
  // TODO: Update user permissions
  res.json({ message: 'Permissions updated', user_id: req.params.id });
});

module.exports = router;
