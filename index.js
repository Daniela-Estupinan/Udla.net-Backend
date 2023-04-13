require('dotenv').config();
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const userRoute = require('./src/routes/usuarioRoute.js');
const login = require('./src/routes/login.js');

app.listen(PORT, console.log("Server start for port: "+ PORT))


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));

//routes middlewares

app.use('/login', require('./src/routes/login.js'));

//routes prefixs

app.use("/api/user", require('./src/routes/usuarioRoute.js'));


module.exports = app;