const express = require('express');
const router = express.Router();
const API = require("../controllers/usuarioController.js")
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
router.get("/:id",API.fetchUsuarioById);
router.get("/",API.fetchAllUsuario);
router.post("/",API.createUsuario);

router.patch("/:id",API.updateUsuario);
router.delete("/:id",API.deleteUsuario);

module.exports = router;