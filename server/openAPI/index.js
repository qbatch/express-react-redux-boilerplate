export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'express-mongoose-boilerplate',
    description: 'A boilerplate API using expressjs and mongoose',
  },
  host: `localhost:${process.env.SERVER_PORT}`,
  basePath: '/api/v1',
  schemes: [
    'http',
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/register': {
      post: {
        tags: [
          'Users'
        ],
        description: 'Create new user in the system',
        parameters: [
          {
            name: 'user',
            email: 'mail@domain.com',
            password: 'Pass1234',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        produces: [
          'application/json'
        ],
        responses: {
          200: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          400: {
            description: 'Email already in use'
          }
        }
      },
    },
    '/login': {
      post: {
        tags: [
          'Users'
        ],
        description: 'Create new user session',
        parameters: [
          {
            email: 'mail@domain.com',
            password: 'Pass1234',
            in: 'body',
            description: 'User who wants to create new session',
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        produces: [
          'application/json'
        ],
        responses: {
          200: {
            description: 'New user session is created',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          400: {
            description: 'Invalid credentials',
          },
        }
      },
    },
    '/get-current-user': {
      get: {
        tags: [
          'Users'
        ],
        description: 'Get currently logged user info',
        components: {
          securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'jwt',
                bearerFormat: 'JWT'
            },
          },
        },
        produces: [
          'application/json'
        ],
        responses: {
          200: {
            description: 'Currently authenticated user is returned',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          401: {
            description: 'Invalid authorization key',
          },
          404: {
            description: 'User not found',
          },
        }
      },
    },
    '/users': {
      get: {
        tags: [
          'Users'
        ],
        description: 'Get all the users in the system',
        components: {
          securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'jwt',
                bearerFormat: 'JWT'
            },
          },
        },
        produces: [
          'application/json'
        ],
        responses: {
          200: {
            description: 'Get all the users in the system',
            schema: {
              $ref: '#/definitions/Users'
            }
          },
          401: {
            description: 'Invalid authorization key'
          }
        }
      },
    },
  },
  definitions: {
    User: {
      required: [
        'name',
        'email',
        'password',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          uniqueItems: true,
        },
        password: {
          type: 'string'
        }
      }
    },
    Users: {
      type: 'array',
      $ref: '#/definitions/User'
    }
  }
}
