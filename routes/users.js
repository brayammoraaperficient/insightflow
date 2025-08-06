
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// Registration endpoint
router.post('/register', auth.register);

// Login endpoint
router.post('/login', auth.login);

// PUT /users/:id/permissions
router.put('/:id/permissions', (req, res) => {
  console.log(`[users/permissions] user_id:`, req.params.id, `body:`, req.body);
  res.json({ message: 'Permissions updated', user_id: req.params.id });
});

module.exports = router;
