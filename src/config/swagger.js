const Package = require('@root/package.json')
const dotenv = require('dotenv')

dotenv.config()

const swaggerOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: Package.name,
      description: Package.description,
      version: Package.version
    },
    host:
      process.env.SWAGGER_DOMAIN || `${process.env.HOST}:${process.env.PORT}`,
    schemes: process.env.NODE_ENV !== 'production' ? ['http'] : ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        in: 'header',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: 'JWT'
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token'
      }
    }
  }
}

exports.options = swaggerOptions
