const express = require("express");
const { registerUser, verifyEmail, sendEmailVerification, resetPassword } = require("../controller/user.controller");
const upload = require("../constants/MulterUpload");
const router = express.Router();


router.post("/register", upload.single('image'), registerUser);
router.post("/send-email-verification" , sendEmailVerification)
router.post("/reset-password" , resetPassword)

module.exports = router