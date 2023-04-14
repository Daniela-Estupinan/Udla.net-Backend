const User = require("../models/User.js");
const fs = require("fs");
module.exports = class API{
    //fetch User posts
    static async fetchAllUser(req,res){
        try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch User by id
    static async fetchUserById(req,res){
        const id = req.params.id;
        try{
            const user = await User.findById(id);
            res.status(200).json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a User
    static async createUser(req,res){
        const user = req.body;
        /*const imagename = req.file.filename;
        usuario.profilePicture = imagename;*/
        try{
            await User.create(user);
            res.status(201).json({message:"User created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a User
    static async updateUser(req,res){
        const id = req.params.id;

        /*let new_image = '';
        if(req.file){
            new_image = req.file.filename;
        try {
         fs.unlinkSync('../uploads/'+ req.body.profilePicture);
            
        } catch (err) {
            console.log(err);
        }    
        }else{
            new_image = req.body.profilePicture;
        }*/
        const newUser = req.body;
       // newUsuario.profilePicture = new_image;

        try {
            await User.findByIdAndUpdate(id,newUser);
            res.status(200).json({message:"User updated succesfully!!"});
            } catch (err) {
             res.status(400).json({message:err.message});
            }
    }
    //delete a posts
    static async deleteUser(req,res){
        const id = req.params.id;
        try {
            const result = await User.findByIdAndDelete(id);
          /*  if(result.profilePicture !=''){
               try {
                    fs.unlinkSync('../uploads' +result.profilePicture);
                } catch (err) {
                    console.log(err);
                }
            }*/
            res.status(200).json({message:"User deleted succesfully!!"});

        } catch (err) {
            res.status(400).json({message:err.message});
        }
    }
    


};