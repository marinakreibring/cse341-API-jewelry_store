const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Jewelry Store API',
        description: 'API for jewelry store items'
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8081',
    schemes: ['http', 'https']
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);