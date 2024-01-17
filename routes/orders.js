const express = require('express')
const router = express.Router();
const Orders = require('../app/models/orders')
const moment = require('moment')

router.post("/", (req, res, next) => {
    console.log(req.body)
    const { phone, address } = req.body
    if (!phone || !address) {
        req.flash('error', 'All fields are required!')
        res.redirect('/cart')
    }
    const order = new Orders({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address
    })
    order.save()
        .then((result) => {
            req.flash('success', 'Order placed Successfully!')
            delete req.session.cart
            res.redirect('/customer/orders')
        })
        .catch((err) => {
            req.flash('error', 'Somthing went wrong!')
            res.redirect('/cart')
        })
})

router.get('/', async (req, res) => {
    const orders = await Orders.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
    res.render('customers/orders', { orders: orders, moment: moment })
})

module.exports = router