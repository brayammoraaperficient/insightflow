const express = require('express');
const router = express.Router();
const passport = require('passport');

// Initiate GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// GitHub OAuth callback
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect after successful login
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      console.log('User logged out successfully');
      res.json({ message: 'User logged out successfully' });
    });
  });
});

module.exports = router;
