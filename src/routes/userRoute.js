const express = require('express');
const router = express.Router();
const API = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");
const API_Post = require("../controllers/postController.js");

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

//POST
router.get("/post/:id",API_Post.fetchPostById);
router.get("/post",API_Post.fetchAllPost);
router.patch("/post/:id",API_Post.updatePost);
router.delete("/post/:id",API_Post.deletePost);
//COMMUNITY

module.exports = router;