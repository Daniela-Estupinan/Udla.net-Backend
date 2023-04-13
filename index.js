require('dotenv').config();
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.listen(PORT, console.log("Server start for port: "+ PORT))


//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));

module.exports = app;