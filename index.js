const express = require ('express');
const app = express();
const PORT = process.env.PORT || 4111;


app.listen(PORT, console.log("Server start for port: "+ PORT))

//database connection

/*mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: true,
    useCreateIndex : true
}).then(()=>console.log('Connected to the database')).catch(err=> console.log(err));*/