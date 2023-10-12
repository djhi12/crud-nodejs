const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Use OpenAPI 3.0 format for better compatibility and features
        info: {
            title: 'Your Node.js API',
            description: 'API documentation for your Node.js project',
            version: '1.0.0',
        },
        security: [
            {
                BearerAuth: [], // Use the security definition defined below
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/items.js'], // Specify your route files here
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
