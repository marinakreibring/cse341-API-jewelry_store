const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

/* GET ALL */
const getAll = async (req, res) => {
  // #swagger.tags = ['Jewelry']
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('jewelry')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE */
const getSingle = async (req, res) => {
  // #swagger.tags = ['Jewelry']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid jewelry ID' });
    }

    const itemId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('jewelry')
      .findOne({ _id: itemId });

    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE */
const createItem = async (req, res) => {
  // #swagger.tags = ['Jewelry']
  // #swagger.description = 'Create a new jewelry item (OAuth protected)'
  try {
    const { title, type, price } = req.body;

    if (!title || !type || price === undefined) {
      return res.status(400).json({
        message: 'Title, type, and price are required'
      });
    }

    const item = {
      title: req.body.title,
      type: req.body.type,
      price: req.body.price,
      material: req.body.material,
      stone: req.body.stone,
      stoneId: req.body.stoneId,
      description: req.body.description,
      inStock: req.body.inStock ?? true
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('jewelry')
      .insertOne(item);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
const updateItem = async (req, res) => {
  // #swagger.tags = ['Jewelry']
  // #swagger.description = 'Update a jewelry item by ID (OAuth protected)'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid jewelry ID' });
    }

    const itemId = new ObjectId(req.params.id);

    const item = {
      title: req.body.title,
      type: req.body.type,
      price: req.body.price,
      material: req.body.material,
      stone: req.body.stone,
      stoneId: req.body.stoneId,
      description: req.body.description,
      inStock: req.body.inStock
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('jewelry')
      .updateOne({ _id: itemId }, { $set: item });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
const deleteItem = async (req, res) => {
  // #swagger.tags = ['Jewelry']
  // #swagger.description = 'Delete a jewelry item by ID (OAuth protected)'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid jewelry ID' });
    }

    const itemId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('jewelry')
      .deleteOne({ _id: itemId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
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
