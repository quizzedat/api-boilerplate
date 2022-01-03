const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      return await fastify.jwt.verify(
        request.headers.authorization,
        async (err, decoded) => {
          if (err) {
            request.log.error('Token expired')
            reply.error('Token expired')
          } else {
            let today = new Date()
            let exp = new Date(today)
            const nowInEpoch = parseInt(exp.getTime() / 1000)
            if (decoded.exp <= nowInEpoch) {
              reply.send('Token expired')
              request.log.error('Token expired')
            }
            request.log.info('Token Vaid')
            request.decoded = decoded
            return request
          }
        }
      )
      done()
    } catch (err) {
      reply.send(err)
    }
  })
})
