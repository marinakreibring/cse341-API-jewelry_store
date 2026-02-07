const router = require('express').Router();
const passport = require('passport');

// start github login
router.get('/github', 
  // #swagger.tags = ['Auth']
  passport.authenticate('github', { scope: ['user:email'] }));

// github callback
router.get(
  '/github/callback',
  // #swagger.tags = ['Auth']
  passport.authenticate('github', {
    failureRedirect: '/login-failed'
  }),
  (req, res) => {
    res.redirect('/auth/login-success');
  }
);

// logout
router.get('/logout', 
  // #swagger.tags = ['Auth']
  (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});

// success / failure helpers
router.get('/login-success', (req, res) => {
  res.json({
    message: 'Login successful',
    user: req.user
  });
});

router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

module.exports = router;
