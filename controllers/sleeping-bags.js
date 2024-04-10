/* global module */

const mongodb = require('../db/connect');

// Create a variable for the database title
const dbTitle = 'sleeping-bags';

// Create a variable for the unique fields of the current database
const dbFieldsArray = [
  'Id',
  'Category',
  'IsClearance',
  'IsNew',
  'Url',
  'Reviews',
  'NameWithoutBrand',
  'Name',
  'IsFamousBrand',
  'Images',
  'SizesAvailable',
  'Colors',
  'DescriptionHtmlSimple',
  'SuggestedRetailPrice',
  'Brand',
  'ListPrice',
  'FinalPrice'
];

// Function to check if all required fields are present in the request body
function checkData(req, requiredFields) {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return false;
    }
  }
  return true;
}

const getMany = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const result = await db.collection(dbTitle).find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const itemId = req.params.id;
    const result = await db.collection(dbTitle).findOne({ Id: itemId });

    if (!result) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const db = await mongodb.getDb();

    // Validate required fields
    if (!checkData(req.body, dbFieldsArray)) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new hammock
    const result = await db.collection(dbTitle).insertOne(req.body);

    // Return the new hammock id in the response body
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const itemId = req.params.id;

    // Validate required fields
    if (!checkData(req.body, dbFieldsArray)) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the hammock
    const result = await db.collection(dbTitle).updateOne({ Id: itemId }, { $set: req.body });

    // Check if the hammock was updated successfully
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const itemId = req.params.id;

    // Delete the hammock
    const result = await db.collection(dbTitle).deleteOne({ Id: itemId });

    // Check if the hammock was deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteItem
};
