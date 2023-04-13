const Usuario = require("../models/Usuario.js");
const fs = require("fs");
const verify = require("../routes/verifyToken.js");
module.exports = class API{
    //fetch User posts
    static async fetchAllUsuario(req,res){
        try{
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
        }catch(err){
            res.stataus(404).json({message: err.message});
        }
    }
    //fetch User by id
    static async fetchUsuarioById(req,res){
        const id = req.params.id;
        try{
            const usuario = await Usuario.findById(id);
            res.status(200).json(usuario);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a User
    static async createUsuario(req,res){
        const usuario = req.body;
        /*const imagename = req.file.filename;
        usuario.profilePicture = imagename;*/
        try{
            await Usuario.create(usuario);
            res.status(201).json({message:"Usuario created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a User
    static async updateUsuario(req,res){
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
        const newUsuario = req.body;
       // newUsuario.profilePicture = new_image;

        try {
            await Usuario.findByIdAndUpdate(id,newUsuario);
            res.status(200).json({message:"Usuario updated succesfully!!"});
            } catch (err) {
             res.status(400).json({message:err.message});
            }
    }
    //delete a posts
    static async deleteUsuario(req,res){
        const id = req.params.id;
        try {
            const result = await Usuario.findByIdAndDelete(id);
          /*  if(result.profilePicture !=''){
               try {
                    fs.unlinkSync('../uploads' +result.profilePicture);
                } catch (err) {
                    console.log(err);
                }
            }*/
            res.status(200).json({message:"Usuario deleted succesfully!!"});

        } catch (err) {
            res.status(400).json({message:err.message});
        }
    }


};