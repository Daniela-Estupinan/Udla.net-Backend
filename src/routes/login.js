const router = require ('express').Router();
const User = require ('../models/User.js');
const Usuario = require ('../models/Usuario.js');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    console.log(req.body)
    const hashPassword = await bcrypt.hash(req.body.data.password,salt);
   
    const user = new User({
        isAdmin: req.body.data.isAdmin,
        id:req.body.data._id,
        email: req.body.data.email,
        password: hashPassword,
        isActive: req.body.data.isAdmin,

    });
    const usuario = new Usuario({
        id: user.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age : req.body.age,
        gender: req.body.gender,
        semester: req.body.semester,
        major: req.body.major,
        description: req.body.description,
        profilePicture : req.body.profilePicture,
        interest: req.body.interest,
        link:{
            "linkedIn":"https://www.linkedin.com",
            "facebook":"https://www.facebook.com"
        }
    });
    const email = user.email.split("@");
    if(email[1]== "udla.edu.ec"){
        console.log("valid");
        try{
            const savedUser = await user.save();
            res.send(savedUser);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }else{
        console.log("not valid");
    }
    
});


//LOGIN

router.post('/login',async (req,res) =>{
    
    const user =  await User.findOne({email: req.body.data.email});
    if(user.isActive==True){
        
        if(!user) return res.status(400).send('Email or password is incorrect')
        //correct
        const validPass = await bcrypt.compare(req.body.data.password, user.password);
    
        //token
    
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        
        res.header('auth-token', token).send({token});
    }


});

module.exports = router;