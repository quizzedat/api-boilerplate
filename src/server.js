'use strict'

// Read the .env file.
require('dotenv').config()

require('v8-compile-cache')
// Require the framework
const Fastify = require('fastify')

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    level: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
  },
  pluginTimeout: 10000
})

// Register your application as a normal plugin.
app.register(require('./app.js'))

// Start listening.
app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
