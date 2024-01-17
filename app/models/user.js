const mongoose = require('mongoose')
const userRegisterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    },

}, { timestamps: true })
const user = mongoose.model('User', userRegisterSchema)
module.exports = user;