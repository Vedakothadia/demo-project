const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../app/models/user')


router.get("/", (req, res, next) => {
    res.render('auth/register')
})
router.post("/", async (req, res, next) => {

    const { name, email, password } = req.body
    // validate Request
    if (!name || !email || !password) {
        req.flash('error', 'All fields are Required!')
        req.flash('name', name)
        req.flash('email', email)
        res.redirect('/register')
    }
    // check email exist or not
    User.exists({ email: email }, (err, result) => {
        if (result) {
            req.flash('error', 'User already exist!')
            req.flash('name', name)
            req.flash('email', email)
            res.redirect('/register')
        }
    })
    // hash password
    const hashPassword = await bcrypt.hash(password, 10)
    // create new user
    const user = new User({
        name: name,
        email: email,
        password: hashPassword
    })
    user.save()
        .then(() => {
            res.redirect('/login')
        })
        .catch(() => {
            req.flash('error', 'Somthing Went Wrong!')
            res.redirect('/register')
        })
})

module.exports = router