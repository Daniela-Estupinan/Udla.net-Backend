const Community = require("../models/Community.js");
const fs = require("fs");
module.exports = class API{
    //fetch all Community
    static async fetchAllCommunity(req,res){
        try{
            const community = await Community.find();
            res.status(200).json(community);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //fetch Community by id
    static async fetchCommunityById(req,res){
        const id = req.params.id;
        try{
            const community = await Community.findById(id);
            res.status(200).json(community);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //create a Community
    static async createCommunity(req,res){
        const community = req.body;
        const imagename = req.file.filename;
        community.profileImage = imagename;
        try{
            await Community.create(community);
            res.status(201).json({message:"Community created succesfully!!"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    //updated a Community
    static async updateCommunity(req,res){
        const id = req.params.id;

        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
        try {
         fs.unlinkSync('../uploads/community/'+ req.body.old_image);
            
        } catch (err) {
            console.log(err);
        }    
        }else{
            new_image = req.body.old_image;
        }
        const newCommunity = req.body;
        newCommunity.profileImage = new_image;

        try {
            await Community.findByIdAndUpdate(id,newCommunity);
            res.status(200).json({message:"Community updated succesfully!!"});
            } catch (err) {
             res.status(400).json({message:err.message});
            }
    }
    //delete a Community
    static async deleteCommunity(req,res){
        const id = req.params.id;
        try {
            const result = await Community.findByIdAndDelete(id);
            if(result.image !=''){
                try {
                    fs.unlinkSync('../uploads/community/' +result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({message:"Community deleted succesfully!!"});

        } catch (err) {
            res.status(400).json({message:err.message});
        }
    }


};