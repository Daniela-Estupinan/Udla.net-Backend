const express = require('express');
const router = express.Router();
const API = require("../controllers/communityController.js");
const multer = require('multer');

//multer mildware
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads/community");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage : storage,
}).single("profileImage");


//COMMUNITY
router.get("/:id",API.fetchCommunityById);
router.get("/",API.fetchAllCommunity);
router.post("/",upload,API.createCommunity);
router.patch("/:id",upload,API.updateCommunity);
router.delete("/:id",API.deleteCommunity);


module.exports = router;