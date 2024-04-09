/* global module */

const express = require('express');
const router = express.Router();
const dbMethod = require('../controllers/hammocks');
const validation = require('../middleware/validate');
const validate = validation.saveOils;

// Gets all database objects
router.get('/', dbMethod.getMany);

// Gets one database object
router.get('/:id', dbMethod.getOne);

// Create a new database object
router.post('/', validate, dbMethod.create);

// Update a database object
router.put('/:id', validate, dbMethod.update);

// Delete a database object
router.delete('/:id', dbMethod.deleteItem);

module.exports = router;
