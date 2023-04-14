const mongoose = require('mongoose');
//const community = require('./Community')
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:false,
        max:255,
        min:6,
        unique:true
    },
   password:{
        type:String,
        required:false,
        max:1024,
        min:6
    },
   role:{
        type:String,
        enum:["admin","user"],
        default:"user",
   },
    isActive:{
        type: Boolean,
        default: true,
        required:true,
    },
    logginDate:{
        type: String, 
        //default: (new Date()).getDate() 
    },
    firstName:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    lastName:{
        type:String,
        max:1024,
        min:6
    },
    age:{
       type: Number
    },
    gender:{
        type: String,
        
        enum:[
            "M","F","O"
        ]
    },
    semester:{
        type: Number
       
    },
    major:{
        type: String,
        
    },
    description:{
        type: String,
        default:"",
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
   communitys:{
        type:"String",
        default:"MyCommunitys"
    },
    interest:{
        type:String
    }
        /*[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Interest'
            
        }]*/
    ,
    links:{
        type: String,
       
    },

    jwtToken:{
        type:String,
    }

});
/*const interestSchema = new mongoose.Schema({
    name:{
        type:String,
        default:"Tecnologia"
    }
});*/
module.exports = mongoose.model('User', userSchema);
//module.exports = mongoose.model('Interest', interestSchema);
