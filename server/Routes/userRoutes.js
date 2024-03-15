const express = require("express");
const router = express.Router();
const userController = require("../controllers/controllers");
router.post("/login", userController.checkUser);
router.post("/register", userController.signupUser);
router.get("/getLibelle", userController.getCodeLibelle);
router.post("/items", userController.createItem);
router.get("/getItems", userController.getItems);
router.delete('/items/:itemId', userController.deleteItem);
router.put('/items/:itemId', userController.updateItem);

module.exports = router;
