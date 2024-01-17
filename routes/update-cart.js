const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {

    // For the first time creating cart and basic Object structure
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }

    // get all details of cart that store in sessions
    let cart = req.session.cart
    // check item does not exist in cart
    if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            items: req.body,
            qty: 1,
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    // Return qty for Cart Number in frontEnd
    res.json({
        totalQty: req.session.cart.totalQty
    })
})


module.exports = router