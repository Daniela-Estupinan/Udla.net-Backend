const express = require('express');
const router = express.Router();
const API = require("../controllers/userController.js")
const multer = require('multer');
const verify = require("./verifyToken.js");
//multer middleware
/*var storage = multer.diskStorage({
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
*/
router.get("/:id",API.fetchUserById);
router.get("/",verify,API.fetchAllUser);
router.post("/",verify,API.createUser);

router.patch("/:id",verify,API.updateUser);
router.delete("/:id",verify,API.deleteUser);

module.exports = router;