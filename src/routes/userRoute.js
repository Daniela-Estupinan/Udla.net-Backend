const express = require('express');
const router = express.Router();
const API = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

//LOGIN
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
//USER
router.get("/:id",API.fetchUserById);
router.get("/",API.fetchAllUser);
router.patch("/:id",API.updateUser);
router.delete("/:id",API.deleteUser);

module.exports = router;