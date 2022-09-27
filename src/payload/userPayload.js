const S = require('fluent-json-schema')

exports.otpSchema = {
  tags: ['User'],
  summary: 'User sign up',
  body: S.object()
    .prop('name', S.string().minLength(4).maxLength(40).required())
    .prop('email', S.string().format(S.FORMATS.EMAIL))
    .prop('phone', S.string().required())
    .prop('country', S.string().required())
}

exports.otpResendSchema = {
  tags: ['User'],
  summary: 'Get OTP',
  body: S.object()
    .prop('phone', S.string().required())
    .prop('country', S.string().required())
}

exports.otpVerifySchema = {
  tags: ['User'],
  summary: 'Verify OTP',
  body: S.object()
    .prop('phone', S.string().required())
    .prop('country', S.string().required())
    .prop('otp', S.string().required())
  // TODO change this when move to production
  // .prop('otp', S.string().minLength(4).maxLength(4).required())
}

exports.getMeSchema = {
  tags: ['User'],
  summary: 'Get user profile',
  security: [{ Bearer: [] }]
}
