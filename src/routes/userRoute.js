const express = require('express');
const router = express.Router();
const API = require("../controllers/userController.js")



router.get("/:id",API.fetchUserById);
router.get("/",API.fetchAllUser);
router.post("/",API.createUser);

router.patch("/:id",API.updateUser);
router.delete("/:id",API.deleteUser);

module.exports = router;