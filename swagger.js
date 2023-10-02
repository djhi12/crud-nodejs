// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Your Node.js API',
            description: 'API documentation for your Node.js project',
            version: '1.0.0',
        },
    },
    apis: ['./routes/items.js'], // Specify your route files here
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
