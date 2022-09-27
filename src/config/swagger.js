const Package = require('../../package.json')
require('dotenv').config()

exports.options = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: Package.name,
      description: `${Package.description} </br>
          <b>In most cases a success response will be in the following structure</b>
          <pre><code>
            {
              "response": {
                &nbsp;&nbsp;"statusCode": 200,
                &nbsp;&nbsp;"message": "Success",
                &nbsp;&nbsp;"error": false,
                &nbsp;&nbsp;"version": "x.x.x"
              },
              "data": []
          </code></pre>`,
      version: Package.version
    },
    host:
      process.env.SWAGGER_DOMAIN || `${process.env.HOST}:${process.env.PORT}`,
    basePath: '/api',
    schemes: ['http', 'https'],
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
