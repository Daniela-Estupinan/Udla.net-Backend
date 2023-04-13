const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({

    _id: {
        type: String
    },
    firstName:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    lastName:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    age:{
        //date
    },
    gender:{
        type: String,
        required:true,
        max:2,
        min:2
    },
    semester:{
        type: Boolean,
        default: false
    },
    major:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    profilePicture:{
        //jpg
    },
    communitys:{
        //id comunity
    },
    interest:{
        interestSchema
    },
    links:{
        type: string
    }



});
const interestSchema = new mongoose.Schema({
    name:{
        type:String
    }
});
module.exports = mongoose.model('Usuario', usuarioSchema);
module.exports = mongoose.model('Interest', interestSchema);