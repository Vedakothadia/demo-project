const mongoose = require('mongoose')
const ordersSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        default: 'COD'
    },
    status: {
        type: String,
        default: 'ordered_placed'
    }
}, { timestamps: true })

const Orders = mongoose.model('Orders', ordersSchema)
module.exports = Orders 