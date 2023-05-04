const Post = require("../models/Post.js");
const fs = require("fs");
module.exports = class API_Post{
    //fetch Post posts
    static async fetchAllPost(req,res){
        try{
            const post = await Post.find();
            res.status(200).json(post);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch Post by id
    static async fetchPostById(req,res){
        const id = req.params.id;
        try{
            const post = await Post.findById(id);
            res.status(200).json(post);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a Post
    static async createPost(req,res){
        const post = req.body;
        /*const imagename = req.file.filename;
        usuario.profilePicture = imagename;*/
        try{
            await Post.create(post);
            res.status(201).json({message:"Post created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a Post
    static async updatePost(req,res){
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
        const newPost = req.body;
       // newUsuario.profilePicture = new_image;

        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({message:"Post updated succesfully!!"});
            } catch (err) {
             res.status(400).json({message:err.message});
            }
    }
    //delete a posts
    static async deletePost(req,res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
          /*  if(result.profilePicture !=''){
               try {
                    fs.unlinkSync('../uploads' +result.profilePicture);
                } catch (err) {
                    console.log(err);
                }
            }*/
            res.status(200).json({message:"Post deleted succesfully!!"});

        } catch (err) {
            res.status(400).json({message:err.message});
        }
    }
    


};