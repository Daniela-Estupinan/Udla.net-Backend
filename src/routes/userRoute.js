const express = require('express');
const router = express.Router();
const API = require("../controllers/userController.js")

const verify = require("./verifyToken.js");


router.get("/:id",API.fetchUserById);
router.get("/",verify,API.fetchAllUser);
router.post("/",verify,API.createUser);

router.patch("/:id",verify,API.updateUser);
router.delete("/:id",verify,API.deleteUser);

module.exports = router;