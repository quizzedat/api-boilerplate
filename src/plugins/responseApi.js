'use strict'

const fp = require('fastify-plugin')
const generateResponse = require('@utils/generatorResponse')

const DEFAULT_ERROR_CODE = 400
const VALIDATION_ERROR_CODE = 422
const UNAUTHORIZED_ERROR_CODE = 401

/**
 * Custom response handler plugin for Fastify
 * @param {FastifyInstance} fastify - Fastify instance
 * @param {Object} opts - Plugin options
 */
module.exports = fp(async function (fastify, opts) {
  // Removed next parameter
  // Success response decorator
  fastify.decorateReply('success', function (data = [], options = {}) {
    const response = {
      error: false,
      message: options.message || 'Success',
      statusCode: options.statusCode || 200,
      ...options
    }

    return this.type('application/json')
      .code(response.statusCode)
      .send(generateResponse(data, response))
  })

  // Error response decorator
  fastify.decorateReply('error', function (options = {}) {
    const response = {
      error: true,
      message: options.message || 'Error occurred',
      statusCode: options.statusCode || DEFAULT_ERROR_CODE,
      ...options
    }

    return this.type('application/json')
      .code(response.statusCode)
      .send(generateResponse([], response))
  })

  // Global error handler
  fastify.setErrorHandler(function (error, request, reply) {
    const errorResponse = handleError(error)
    return reply
      .type('application/json')
      .code(errorResponse.statusCode)
      .send(generateResponse([], errorResponse))
  })
})

/**
 * Handle different types of errors and return appropriate response
 * @param {Error} error - Error object
 * @returns {Object} Error response object
 */
function handleError(error) {
  // Validation errors
  if (error.validation) {
    return {
      error: true,
      statusCode: VALIDATION_ERROR_CODE,
      message: formatValidationMessage(error.validation[0].message),
      details: error.validation
    }
  }

  // Known errors with status codes
  if (error.statusCode) {
    return {
      error: true,
      statusCode: error.statusCode,
      message: error.message,
      code: error.code
    }
  }

  // Default error response
  return {
    error: true,
    statusCode: DEFAULT_ERROR_CODE,
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  }
}

/**
 * Format validation error message
 * @param {string} message - Raw validation message
 * @returns {string} Formatted message
 */
function formatValidationMessage(message) {
  return message.charAt(0).toUpperCase() + message.slice(1)
}
