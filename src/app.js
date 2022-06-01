'use strict'

require('dotenv').config()
// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
// Require external modules
const path = require('path')
const AutoLoad = require('fastify-autoload')
const oas = require('fastify-oas')
const Etag = require('fastify-etag')
// Import Swagger Options
const swagger = require('./config/swagger')

module.exports = function (fastify, opts, next) {
  fastify.register(require('fastify-cors'), {
    origin: '*',
    allowedHeaders: ['Authorization', 'Content-Type', 'x-admin-auth'],
    credentials: true
  })
  fastify.register(oas, swagger.options)
  fastify.register(Etag)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts)
  })
  next()
}
