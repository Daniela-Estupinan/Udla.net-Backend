require('dotenv').config();
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

app.listen(PORT, console.log("Server start for port: "+ PORT))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));



//routes prefixs

app.use("/api/user", require('./src/routes/userRoute.js'));//User
app.use("/api/post",require('./src/routes/postRoute.js'));//Post
app.use("/api/community",require('./src/routes/communityRoute.js'));//Community




module.exports = app;

