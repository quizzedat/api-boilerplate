'use strict'

const User = require('@models/userModel.js')
const userPayload = require('@payloads/userPayload.js')

module.exports = async function (fastify, opts) {
  fastify.post(
    '/signup',
    { schema: userPayload.otpSchema },
    async function (request, reply) {
      const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
      const { phone, country, name, email } = request.body
      const user = await User.getUserByEmail(email)
      try {
        if (user === null) {
          await User.create({
            phone,
            country,
            name,
            email: email.toLowerCase().trim(),
            otp
          })
          reply.success({
            message: 'Sign up successful, please verify your phone number.',
            otp: otp
          })
        } else {
          reply.error({ message: 'User already exists, please login.' })
        }
      } catch (error) {
        reply.error({ message: 'User already exists, please login.' })
      }
    }
  ),
    fastify.post(
      '/otpresend',
      { schema: userPayload.otpResendSchema },
      async function (request, reply) {
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        const { phone, country } = request.body
        let user = await User.resetOtp(otp, phone, country)
        if (user === null) {
          reply.error({ message: 'No such user exists, please sign up.' })
        } else {
          reply.success({
            message: 'New OTP has been sent successfully',
            otp: otp
          })
        }
      }
    )
  fastify.post(
    '/otpverify',
    { schema: userPayload.otpVerifySchema },
    async function (request, reply) {
      const { phone, country, otp } = request.body
      let user = await User.verifyOtp(otp, phone, country)
      if (user === null) {
        reply.error({ message: 'OTP is invalid or already verified' })
      } else {
        const accessToken = fastify.jwt.sign(
          { userId: user._id, isVerified: user.isVerified },
          { expiresIn: '7d' }
        )
        reply.success({
          message: 'OTP has been verified successfully',
          accessToken: accessToken
        })
      }
    }
  )
  fastify.get(
    '/me',
    { schema: userPayload.getMeSchema, onRequest: [fastify.authenticate] },
    async function (request, reply) {
      reply.success({
        message: 'Success'
      })
    }
  )
}

module.exports.autoPrefix = '/user'
