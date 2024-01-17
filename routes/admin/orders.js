const express = require('express')
const router = express.Router();
const Orders = require('../../app/models/orders')

router.get("/", (req, res, next) => {
    Orders.find({ status: { $ne: 'completed' } }, null, { sort: { createdAt: -1 } })
        .populate('customerId', '-password').exec((err, orders) => {

            res.render('admin/orders')
        })
})

module.exports = router