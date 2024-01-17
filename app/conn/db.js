require('dotenv').config()
const mongoose = require('mongoose');
const conn_url = process.env.CONN_URL
mongoose.connect(conn_url)
// .then(() => {
//     console.log("Connection is Done!");
// }).catch((e) => {
//     console.log(e);
// })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection is Done!");
})
