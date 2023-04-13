const User = require("../models/Usuario");
const fs = require("fs");
const verify = require("../routes/verifyToken.js");
module.exports = class API{
    //fetch User posts
    static async fetchAllUser(req,res){
        try{
            const users = await User.find();
            res.status(200).json(users);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch User by id
    static async fetchUserById(req,res){
        const id = req.params.id;
        try{
            const post = await Post.findById(id);
            res.status(200).json(post);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a User
    static async createUser(req,res){
        const user = req.body;
      /*  const imagename = req.file.filename;
        post.image = imagename;*/
        try{
            await User.create(user);
            res.status(201).json({message:"Post created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a User
    static async updateUser(req,res){
        const id = req.params.id;

       /* let new_image = '';
        if(req.file){
            new_image = req.file.filename;
        try {
         fs.unlinkSync('./uploads/'+ req.body.old_image);
            
        } catch (err) {
            console.log(err);
        }    
        }else{
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;*/

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
           /* if(result.image !=''){
                try {
                    fs.unlinkSync('./uploads' +result.image);
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