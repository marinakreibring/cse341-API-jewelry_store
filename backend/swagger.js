const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Jewelry Store API',
    description: 'API for jewelry store with OAuth authentication and CRUD operations'
  },
  host: process.env.RENDER_EXTERNAL_URL
    ? process.env.RENDER_EXTERNAL_URL.replace('https://', '')
    : 'localhost:8081',
  schemes: ['http', 'https'],
  tags: [
    { name: 'Auth', description: 'OAuth authentication routes' },
    { name: 'Jewelry', description: 'Jewelry endpoints (protected)' },
    { name: 'Stones', description: 'Stones endpoints' }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
