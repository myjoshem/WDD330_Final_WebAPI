/* global process */ //this is a special comment for eslint to clear errors over the 'process' module

// Importing necessary modules
const express = require('express');
const cors = require('cors'); // Importing the cors middleware
const mongodb = require('./db/connect');
const PORT = process.env.PORT || 8080;
const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Adding middleware to parse JSON in incoming requests

// Use the cors middleware to handle CORS headers
app.use(cors());

// Importing routes from a separate file and mounting them on the root path
app.use('/', require('./routes'));

// Function to start the server asynchronously
const startServer = async () => {
  try {
    // Establishing a connection to the database using the connectToDatabase function
    await mongodb.connectToDatabase();

    // Starting the Express app to listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    // Handling any errors that occur during the server startup
    console.error({ message: err });
  }
};

// Calling the function to start the server
startServer();
