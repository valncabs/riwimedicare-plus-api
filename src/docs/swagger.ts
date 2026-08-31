import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RiwiMediCare Plus API', 
      version: '1.0.0',
      description: 'API REST',        
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',               
          scheme: 'bearer',           
          bearerFormat: 'JWT',        
        },
      },
      schemas: {
        Task: {
          type: 'object',             
          properties: {
            id: {
              type: 'integer',        
              example: 1,
            },
            title: {
              type: 'string',         
              example: 'Learn Swagger', 
            },
            description: {
              type: 'string',         
              example: 'Document the RiwiMediCare Plus API', 
            },
            status: {
              type: 'string',         
              example: 'pending',     
            },
          },
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts',              
    './src/controllers/*.ts',         
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
