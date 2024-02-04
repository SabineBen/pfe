// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllers");

router.post("/login", userController.checkUser);
router.post("/register", userController.signupUser);

module.exports = router;
