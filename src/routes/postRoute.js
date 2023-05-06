const express = require('express');
const router = express.Router();
const API_Post = require("../controllers/postController.js");
const multer = require('multer');

//multer mildware
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage : storage,
}).single("image");


//POST
router.get("/:id",API_Post.fetchPostById);
router.get("/",API_Post.fetchAllPost);
router.post("/",upload,API_Post.createPost);
router.patch("/:id",upload,API_Post.updatePost);
router.delete("/:id",API_Post.deletePost);
//COMMUNITY

module.exports = router;