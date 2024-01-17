//require module
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const mongodbStore = require('connect-mongodb-session')(session)
require('./app/conn/db')
const passport = require('passport')

// Import Routers
const indexRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register');
const cartRoutes = require('./routes/cart')
const updateCartRoutes = require('./routes/update-cart')
const logoutRoute = require('./routes/logout')
const ordersRoute = require('./routes/orders')
// Admin side
const adminOrders = require('./routes/admin/orders')

// For geting data frome URL using body parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json())


// Set Path for EJS
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//Create mongoStore For session and store session and cookie in database
let mongostore = new mongodbStore({
    uri: process.env.CONN_URL,
    collection: 'sessions'
})

// Create Session and cookies
app.use(session({
    secret: 'vedakothadia',
    resave: false,
    store: mongostore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24hr
}))
app.use(flash())


// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// make session globle for use in any file of frontEnd
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user  // Set user to make globle for use 
    next()
})


const guest = require('./app/htttp/middleware/guest')
const auth = require('./app/htttp/middleware/auth')


// Import router

// Index Route
app.use('/', indexRoutes)
// Login | Register | Logout  Routes
app.use('/login', guest, loginRoutes)
app.use('/register', guest, registerRoutes)
app.use('/logout', logoutRoute)

// Cart | Update-cart Routes
app.use('/cart', cartRoutes)
// Update-cart use for updating cart
app.use('/update-cart', updateCartRoutes)

// Use for Order
app.use('/orders', auth, ordersRoute)
// Show order page to User
app.use('/customer/orders', auth, ordersRoute)

// Admin side
// admin order routes
app.use('/admin/orders', adminOrders)




// Export App.js File
module.exports = app;