'use strict'
const S = require('fluent-json-schema')

// Common schema components for reuse
const commonFields = {
  phone: S.string()
    .pattern('^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$')
    .description('Phone number in international format')
    .required(),

  country: S.string()
    .minLength(2)
    .maxLength(2)
    .pattern('^[A-Z]{2}$')
    .description('ISO 3166-1 alpha-2 country code')
    .required(),

  email: S.string()
    .format(S.FORMATS.EMAIL)
    .description('Valid email address')
    .required(),

  name: S.string()
    .minLength(2)
    .maxLength(50)
    .pattern('^[a-zA-Z ]*$')
    .description('User full name')
    .required(),

  otp: S.string()
    .pattern('^[0-9]{4}$')
    .description('4-digit OTP code')
    .required()
}

// Response schemas
const responses = {
  success: S.object()
    .prop('statusCode', S.number().default(200))
    .prop('message', S.string())
    .prop('data', S.object()),

  error: S.object()
    .prop('statusCode', S.number().default(400))
    .prop('error', S.string())
    .prop('message', S.string())
}

exports.otpSchema = {
  tags: ['User'],
  summary: 'User sign up',
  description: 'Create a new user account and send verification OTP',
  body: S.object()
    .prop('name', commonFields.name)
    .prop('email', commonFields.email)
    .prop('phone', commonFields.phone)
    .prop('country', commonFields.country)
    .additionalProperties(false),
  response: {
    200: responses.success.prop('data', S.object().prop('otp', S.string())),
    400: responses.error,
    409: responses.error.description('User already exists')
  }
}

exports.otpResendSchema = {
  tags: ['User'],
  summary: 'Resend OTP',
  description: 'Resend verification OTP to existing user',
  body: S.object()
    .prop('phone', commonFields.phone)
    .prop('country', commonFields.country)
    .additionalProperties(false),
  response: {
    200: responses.success.prop('data', S.object().prop('otp', S.string())),
    404: responses.error.description('User not found')
  }
}

exports.otpVerifySchema = {
  tags: ['User'],
  summary: 'Verify OTP',
  description: 'Verify user phone number with OTP',
  body: S.object()
    .prop('phone', commonFields.phone)
    .prop('country', commonFields.country)
    .prop('otp', commonFields.otp)
    .additionalProperties(false),
  response: {
    200: responses.success.prop(
      'data',
      S.object().prop('accessToken', S.string())
    ),
    400: responses.error.description('Invalid OTP'),
    404: responses.error.description('User not found')
  }
}

exports.getMeSchema = {
  tags: ['User'],
  summary: 'Get user profile',
  description: 'Get authenticated user profile details',
  security: [{ Bearer: [] }],
  response: {
    200: responses.success.prop(
      'data',
      S.object()
        .prop('name', S.string())
        .prop('email', S.string())
        .prop('phone', S.string())
        .prop('country', S.string())
        .prop('isVerified', S.boolean())
        .prop('isKycDone', S.boolean())
    ),
    401: responses.error.description('Unauthorized'),
    404: responses.error.description('User not found')
  }
}
