const S = require('fluent-schema')

const bodyJsonSchema = S.object().prop(
    'email',
    S.string()
        .format(S.FORMATS.EMAIL)
        .required()
)

exports.getTokenSchema = {
    tags: ['User'],
    summary: 'Get a users token',
    body: bodyJsonSchema
}
