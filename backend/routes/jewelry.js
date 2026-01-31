const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const jewelryController = require('../controllers/jewelry');

// GET all jewelry
router.get('/', jewelryController.getAll);

// GET jewelry by id
router.get('/:id', jewelryController.getSingle);

// CREATE new jewelry, protected route
router.post('/', authenticate, jewelryController.createItem);

// UPDATE jewelry by id, protected route
router.put('/:id', authenticate, jewelryController.updateItem);

// DELETE jewelry by id, protected route
router.delete('/:id', authenticate, jewelryController.deleteItem);

module.exports = router;
