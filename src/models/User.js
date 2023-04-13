const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    _id: {
        type: String
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    isAdmin:{
        type: Boolean, 
        default: false
    },
    isActive:{
        type: Boolean,
        default: false
    },
    loginDate:{
        type: Number, 
        default: (new Date()).getTime() 
    }

});

module.exports = mongoose.model('User', userSchema);