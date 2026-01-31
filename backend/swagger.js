const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Jewelry Store API',
    description: 'API for jewelry store items'
  },
  host: 'localhost:8081',
  schemes: ['http', 'https'],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      BearerAuth: []
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
