const Package = require('../../package.json')
const fastJson = require('fast-json-stringify')

const base = {
    response: {
        statusCode: 200,
        message: null,
        error: false,
        version: Package.version || '0.0.1'
    },
    data: []
}

const stringify = fastJson({
    type: 'object',
    properties: {
        response: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number'
                },
                message: {
                    type: 'string'
                },
                error: {
                    type: 'boolean'
                },
                version: {
                    type: 'string'
                }
            }
        },
        data: {
            type: 'array'
        }
    }
})

/**
 * Build response base by plugin
 */
module.exports = (data, response) => {
    const baseT = { ...base }

    baseT.response = { ...base.response, ...response }
    baseT.data = data

    return baseT
}
