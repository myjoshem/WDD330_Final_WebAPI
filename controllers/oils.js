/* global module */

//To create a new controller, you only need to copy this code and change 2 items:
//1. dbTitle = new collection name
//2. dbFieldsArray = fields in the new collection

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//create a variable for the database title
const dbTitle = 'oils';

//create a variable for the unique fields of the current database
const dbFieldsArray = ['name', 'brand', 'type', 'description', 'size', 'price', 'ingredients', 'item_number', 'image'];

//all code below this line requires no changes

//creates an object based on the fields from the database fields array
const dbObject = dbFieldsArray.reduce((obj, field) => {
  obj[field] = true;
  return obj;
}, {});

//Rather than repeat this code in each method below, I put it into a function that I can use in the if statement instead. The 'req' parameter passes in the 'req.body' obtained inside the individual function and 'requiredFields' parameter passes in the global dbFieldsArray variable.
function checkData(req, requiredFields) {
  for (const field of requiredFields) {
    if (!req[field]) {
      return false;
    }
  }
  return true;
}

async function getMany(req, res) {
  try {
    const db = await mongodb.getDb();
    const result = await db.collection(dbTitle).find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.collection(dbTitle).findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ error: 'Content not found' });
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
    if (checkData(req.body, dbFieldsArray)) {
      return res.status(400).json({ error: 'All fields are required' });
    } else {
      // Create a new contact
      const result = await db.collection(dbTitle).insertOne(req.body);

      // Return the new contact id in the response body
      res.status(201).json({ _id: result.insertedId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Validate required fields
    if (checkData(req.body, dbFieldsArray)) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the contact
    const result = await db.collection(dbTitle).updateOne({ _id: userId }, { $set: req.body });

    // Check if the contact was updated successfully
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
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
    const userId = new ObjectId(req.params.id);

    // Delete the contact
    const result = await db.collection(dbTitle).deleteOne({ _id: userId });

    // Check if the contact was deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
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
