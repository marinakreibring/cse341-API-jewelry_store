const express = require('express');
const router = express.Router();

const stonesController = require('../controllers/stones');

// GET all stones
router.get('/', stonesController.getAll);

// GET stone by id
router.get('/:id', stonesController.getSingle);

// CREATE new stone
router.post('/', stonesController.createItem);

// UPDATE stone by id
router.put('/:id', stonesController.updateItem);

// DELETE stone by id
router.delete('/:id', stonesController.deleteItem);

module.exports = router;