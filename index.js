require('dotenv').config();
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');


app.listen(PORT, console.log("Server start for port: "+ PORT))


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));

//routes middlewares

app.use('/api/login', require('./src/routes/login.js'));

//routes prefixs

app.use("/api/usuario", require('./src/routes/usuarioRoute.js'));
app.use("/api/user", require('./src/routes/userRoute.js'));

module.exports = app;