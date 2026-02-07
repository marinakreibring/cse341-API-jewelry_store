const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const jewelryController = require('../controllers/jewelry');

// GET all jewelry
router.get('/', jewelryController.getAll);

// GET jewelry by id
router.get('/:id', jewelryController.getSingle);

const { validateJewelry } = require('../validation/jewelryvalidator');

// CREATE new jewelry
router.post('/', authenticate, validateJewelry, jewelryController.createItem);

// UPDATE jewelry by id
router.put('/:id', authenticate, validateJewelry, jewelryController.updateItem);

// DELETE jewelry by id, protected route
router.delete('/:id', authenticate, jewelryController.deleteItem);

module.exports = router;
