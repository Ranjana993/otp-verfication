const express = require("express");
const { registerUser, verifyEmail, sendEmailVerification } = require("../controller/user.controller");
const upload = require("../constants/MulterUpload");
const router = express.Router();


router.post("/register", upload.single('image'), registerUser);
router.post("/send-email-verification" , sendEmailVerification)


module.exports = router