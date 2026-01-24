const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['Stones']
  try {
  const result = await mongodb
      .getDb()
      .db()
      .collection('stones')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  };

const getSingle = async (req, res) => {
  // #swagger.tags = ['Stones']
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('stones')
    .findOne({ _id: itemId });

  res.status(200).json(result);
};
// Implementation for creating a new item
const createItem = async (req, res) => {
  // #swagger.tags = ['Stones']
  const item = {
    name: req.body.name,
    color: req.body.color,
    origin: req.body.origin,
    chakra: req.body.chakra,
    meaning: req.body.meaning,
    element: req.body.element,
    property: req.body.property,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('stones')
    .insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the item.');
  }
};
// Implementation for updating an item
const updateItem = async (req, res) => {
  // #swagger.tags = ['Stones']
 const itemId = new ObjectId(req.params.id);
 const item = {
    name: req.body.name,
    color: req.body.color,
    origin: req.body.origin,
    chakra: req.body.chakra,
    meaning: req.body.meaning,
    element: req.body.element,
    property: req.body.property,
 };
 const response = await mongodb.getDb()
   .db()
   .collection('stones')
   .replaceOne({ _id: itemId }, item);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the item.');
  }
}; 
// Implementation for deleting an item             
const deleteItem = async (req, res) => {
  // #swagger.tags = ['Stones']
  const itemId = new ObjectId(req.params.id);
  const response = await mongodb.getDb()
    .db()
    .collection('stones')
    .deleteOne({ _id: itemId });
  console.log(response);  
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item.');
  }
}



module.exports = { getAll, 
  getSingle,
  createItem,
  updateItem,
  deleteItem
 };