const express = require('express')
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('customers/cart')
})

module.exports = router