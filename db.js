const mongoose = require('mongoose');
require('dotenv').config();
//Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotel';
const mongoURL = process.env.MONGO_URL;

//Setup MongoDB connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     // userUnifiedTopology: true
// })
mongoose.connect(mongoURL);
//Access the default connection object
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected', ()=>{
    console.log('connected to MongoDB server');
})
db.on('error',(err)=>{
    console.log('Mongodb Connection Error:', err);
})
db.on('disconnected',()=>{
    console.log('MongoDB connection Lost');
})

//Export Database Connection
module.exports = db;