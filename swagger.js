const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Essential Oils Shop API',
    description: 'Database of essential oils and other inventory collections for shop'
  },
  host: 'wdd330-final-webapi.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
