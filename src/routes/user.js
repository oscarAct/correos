const express = require("express");
const userController = require("../controllers/userController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de usuarios

router.post("/user/sendMail", userController.sendMail);

module.exports = router;
