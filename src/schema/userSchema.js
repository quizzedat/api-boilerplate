const Joi = require('joi')
const convert = require('joi-to-json')
Joi.objectId = require('joi-objectid')(Joi)

const wlSchema1 = convert(
    Joi.object().keys({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                allowUnicode: false
            })
            .required()
            .description(' Email of the user')
    })
)

exports.getTokenSchema = {
    tags: ['User'],
    summary: 'Get a users token',
    body: wlSchema1
}
