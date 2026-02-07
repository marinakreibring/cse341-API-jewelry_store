const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Jewelry store');
});

router.use('/auth', require('./auth'));
router.use('/api-docs', require('./swagger'));
router.use('/jewelry', require('./jewelry'));
router.use('/stones', require('./stones'));

module.exports = router;
