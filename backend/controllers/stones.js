const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

/* GET ALL */
const getAll = async (req, res) => {
  // #swagger.tags = ['Stones']
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE */
const getSingle = async (req, res) => {
  // #swagger.tags = ['Stones']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid stone ID' });
    }

    const itemId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .findOne({ _id: itemId });

    if (!result) {
      return res.status(404).json({ message: 'Stone not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE */
const createItem = async (req, res) => {
  // #swagger.tags = ['Stones']
  // #swagger.description = 'Create a new stone (OAuth protected)'
  try {
    const { name, color, meaning } = req.body;

    if (!name || !color || !meaning) {
      return res.status(400).json({
        message: 'Name, color, and meaning are required'
      });
    }

    const item = {
      name: req.body.name,
      color: req.body.color,
      origin: req.body.origin,
      chakra: req.body.chakra,
      meaning: req.body.meaning,
      element: req.body.element,
      property: req.body.property
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .insertOne(item);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
const updateItem = async (req, res) => {
  // #swagger.tags = ['Stones']
  // #swagger.description = 'Update a stone by ID (OAuth protected)'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid stone ID' });
    }

    const itemId = new ObjectId(req.params.id);

    const item = {
      name: req.body.name,
      color: req.body.color,
      origin: req.body.origin,
      chakra: req.body.chakra,
      meaning: req.body.meaning,
      element: req.body.element,
      property: req.body.property
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .updateOne({ _id: itemId }, { $set: item });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Stone not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
const deleteItem = async (req, res) => {
  // #swagger.tags = ['Stones']
  // #swagger.description = 'Delete a stone by ID (OAuth protected)'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid stone ID' });
    }

    const itemId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .deleteOne({ _id: itemId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Stone not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createItem,
  updateItem,
  deleteItem
};
