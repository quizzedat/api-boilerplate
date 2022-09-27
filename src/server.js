'use strict'

// Read the .env file.
require('dotenv').config()

require('v8-compile-cache')

const fastify = require('fastify')({
  logger: {
    level: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
  },
  pluginTimeout: 10000
})

// Register application as a normal plugin.
fastify.register(require('./app.js'))

// Run the server!
const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || '3000',
      host: process.env.HOST || '0.0.0.0'
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()
