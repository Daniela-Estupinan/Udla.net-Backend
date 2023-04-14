const mongoose = require('mongoose');
const community = require('./Community')
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
    logginDate:{
        type: Number, 
        default: (new Date()).getTime() 
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
       type: Date
    },
    gender:{
        type: String,
        required:true,
        enum:[
            "M","F","O"
        ]
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
        name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    },
  /*  communitys:{
        
    },*/
    interest:
        [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Interest'
        }]
    ,
    links:{
        type: String
    }



});
const interestSchema = new mongoose.Schema({
    name:{
        type:String
    }
});
module.exports = mongoose.model('Usuario', userSchema);
module.exports = mongoose.model('Interest', interestSchema);