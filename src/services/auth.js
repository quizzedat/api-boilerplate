'use strict'

const User = require('../models/userModel.js')
const payloadSchema = require('../schema/userSchema.js')

module.exports = async function(fastify, opts) {
    fastify.post(
        '/user/token',
        { schema: payloadSchema.getTokenSchema },
        async function(request, reply) {
            const email = request.body.email
            const userModeal = new User()
            const user = await userModeal.getUserByEmail(email)

            if (user == null || user.email !== email) {
                reply.error({ message: 'Invalid username or password' })
            } else {
                const token = fastify.jwt.sign(
                    { userId: user._id },
                    { expiresIn: '7d' }
                )
                reply.success({ token })
            }
        }
    )
}
