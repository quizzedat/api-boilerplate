const Package = require('../../package.json')

const base = {
  response: {
    statusCode: 200,
    message: null,
    error: false,
    version: Package.version || '0.0.1'
  },
  data: []
}

/**
 * Build response base by plugin
 */
module.exports = (data, response) => {
  const baseT = { ...base }

  baseT.response = { ...base.response, ...response }
  baseT.data = data

  return baseT
}
