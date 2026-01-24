const express = require('express');
const router = express.Router();

const jewelryController = require('../controllers/jewelry');

// GET all jewelry
router.get('/', jewelryController.getAll);

// GET jewelry by id
router.get('/:id', jewelryController.getSingle);

// CREATE new jewelry
router.post('/', jewelryController.createItem);

// UPDATE jewelry by id
router.put('/:id', jewelryController.updateItem);

// DELETE jewelry by id
router.delete('/:id', jewelryController.deleteItem);

module.exports = router;