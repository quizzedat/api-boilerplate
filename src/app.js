'use strict'
require('dotenv').config()
// Require external modules
const path = require('path')
const autoload = require('@fastify/autoload')
const swagger = require('@fastify/swagger')
const swaggerUi = require('@fastify/swagger-ui')

const Etag = require('@fastify/etag')
const cors = require('@fastify/cors')

// Import Swagger Options
const swaggerConf = require('@configs/swagger')

module.exports = function (fastify, opts, next) {
  fastify.register(cors, {
    origin: '*',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    maxAge: 8400
  })
  // Register swagger
  fastify.register(swagger, swaggerConf.options)
  // Register swagger UI
  fastify.register(swaggerUi, swaggerConf.uiOptions)

  fastify.register(Etag)

  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'plugins')
  })
  fastify.register(autoload, {
    dir: path.join(__dirname, 'services/v1/'),
    options: Object.assign({ prefix: '/api/v1' }, opts)
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  next()
}
