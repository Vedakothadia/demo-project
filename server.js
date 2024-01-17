// const express = require('express')
// const app = express()
// const ejs = require('ejs')
// const expressLayouts = require('express-ejs-layouts')
// const path = require('path')

// const PORT = process.env.PORT || 3000

// app.get("/",(req,res)=>{
//     res.render('home')
// })

// // Set Template Engine
// app.use(expressLayouts)
// app.set('views',path.join(__dirname,'/resources/views'))
// app.set('view engine','ejs')

// app.listen(PORT, () => {
//     console.log(`Server is working on ${PORT}`)
// })

const http = require('http')
const port = process.env.PORT || 3001
const app = require('./app')
// require('./app/conn/db')

const server = http.createServer(app)
server.listen(port, () => {
    console.log("Sever is working")
})

// Create HTTP server and import app module
// App module from app.js