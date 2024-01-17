const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get("/", (req, res, next) => {
    res.render('auth/login')
})
router.post("/", (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        // console.log(info)
        if (err) {
            req.flash('error', info.message)
            next(err)
            // console.log("err")
        }
        if (!user) {
            req.flash('error', info.message)
            res.redirect('/login')
        }
        req.logIn(user, (err) => {
            if (user) {
                req.flash('error', info.message)
                res.redirect('/')
            }
        })
    })(req, res, next)

})

// router.post("/", passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

module.exports = router