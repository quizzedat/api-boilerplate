'use strict'
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: { type: String, default: '--' },
    phone: { type: String, unique: true, default: '--' },
    country: { type: String, default: '--' },
    otp: {
      type: Number,
      required: true,
      default: 0
    },
    isVerified: { type: Boolean, default: false },
    isKycDone: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

UserSchema.statics = {
  getUserById: async function (id) {
    let query = { _id: id }
    const options = {
      criteria: query
    }
    return this.load(options)
  },

  getUserByEmail: async function (email) {
    let query = { email }
    const options = {
      criteria: query
    }
    return this.load(options)
  },

  resetOtp: async function (otp, phone, country) {
    return await this.findOneAndUpdate(
      { phone: phone, country: country },
      {
        $set: {
          otp: otp
        }
      },
      { new: true }
    )
  },

  verifyOtp: async function (otp, phone, country) {
    return await this.findOneAndUpdate(
      { phone: phone, country: country, otp: otp, isVerified: false },
      {
        $set: {
          otp: 0,
          isVerified: true
        }
      },
      { new: true }
    )
  },

  load: function (options, cb) {
    options.select = options.select || 'email name'
    return this.findOne(options.criteria).select(options.select).exec(cb)
  },

  list: function (options) {
    const criteria = options.criteria || {}
    const page = options.page - 1
    const limit = parseInt(options.limit) || 12
    const select = options.select || 'email name createdAt -__v'
    return this.find(criteria)
      .select(select)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec()
  }
}

UserSchema.index(
  {
    phone: 1,
    country: 1
  },
  { unique: true }
)

module.exports = mongoose.model('User', UserSchema)
