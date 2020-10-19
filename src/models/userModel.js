'use strict'
// External Dependancies
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: { type: String, default: '--' }
    },
    {
        timestamps: true
    }
)

UserSchema.methods = {
    getUserById: async function(id) {
        const User = mongoose.model('User')
        let query = { _id: id }
        const options = {
            criteria: query
        }
        return User.load(options)
    }
}

UserSchema.statics = {
    load: function(options, cb) {
        options.select = options.select || 'email name'
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb)
    },

    list: function(options) {
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

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema)
