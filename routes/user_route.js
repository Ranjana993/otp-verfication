const express = require("express");
const { registerUser, verifyEmail } = require("../controller/user.controller");
const upload = require("../constants/MulterUpload");
const router = express.Router();


router.post("/register", upload.single('image'), registerUser);
router.post("/verify-email", verifyEmail)


module.exports = router