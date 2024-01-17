const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')


function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email })
        // console.log(user._id)
        if (!user) {
            return done(null, false, { message: 'User Not Valid!' })
        }
        bcrypt.compare(password, user.password)
            .then((match) => {
                if (match) {
                    return done(null, user, { message: 'Logged Sucessfully!' })
                }
                else {
                    return done(null, false, { message: 'Username or Password is not Valid!' })
                    // console.log("not match")
                }
            })
            .catch((err) => {
                return done(null, false, { message: 'Somthing went wrong!' })
            })
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById({ _id: id }, (err, user) => {
            return done(err, user)
        })
    })
}
module.exports = initialize