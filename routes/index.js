const express = require('express')
const router = express.Router();
const Menu = require('../app/models/menu')

router.get("/", (req, res, next) => {
    Menu.find().then((cakes) => {
        res.render('index', { cakes: cakes })
    })
})

module.exports = router