const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const stonesController = require('../controllers/stones');

// GET all stones
router.get('/', stonesController.getAll);

// GET stone by id
router.get('/:id', stonesController.getSingle);

const { validateStone } = require('../validation/stonevalidator');

// CREATE new stone
router.post('/', authenticate, validateStone, stonesController.createItem);

// UPDATE stone by id
router.put('/:id', authenticate, validateStone, stonesController.updateItem);

// DELETE stone by id
router.delete('/:id', authenticate, stonesController.deleteItem);

module.exports = router;