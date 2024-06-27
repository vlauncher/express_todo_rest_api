// swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todos API',
      version: '1.0.0',
      description: 'API for managing todos',
      contact: {
        name: 'Developer',
        email: 'developer@example.com',
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Development server',
        },
      ],
    },
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the todo',
            },
            title: {
              type: 'string',
              description: 'The title of the todo',
            },
            description: {
              type: 'string',
              description: 'The description of the todo',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date the todo was created',
            },
          },
          example: {
            _id: '60d0fe4f5311236168a109ca',
            title: 'Sample Todo',
            description: 'This is a sample todo item',
            date: '2024-06-27T08:00:00Z',
          },
        },
        TodoInput: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'The title of the todo',
            },
            description: {
              type: 'string',
              description: 'The description of the todo',
            },
          },
          example: {
            title: 'New Todo',
            description: 'This is a new todo item',
          },
        },
      },
    },
  },
  apis: ['./routes/todos.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
