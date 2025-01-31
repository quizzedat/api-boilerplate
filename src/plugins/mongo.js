const fp = require('fastify-plugin')
const mongoose = require('mongoose')

// Connect to DB
async function dbConnector(fastify, options) {
  try {
    const url = process.env.MONGO_CONN
    if (url) {
      const db = await mongoose.connect(url, {})
      fastify.decorate('mongo', db)
    } else {
      console.log('Error connecting database')
      process.exit(1)
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = fp(dbConnector)
