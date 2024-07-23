const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();

app.get('/', function(req, res){
    res.send('Welcome to this page');
})

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menuitem', menuItemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is Listening");
})