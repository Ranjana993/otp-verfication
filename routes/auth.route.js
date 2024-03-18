const express = require("express");
const { verifyEmail, resetPasswordResponse, updatePassword } = require("../controller/user.controller");

const authRouter  = express.Router();
authRouter.get("/mail-verification", verifyEmail)
authRouter.get("/reset-password" , resetPasswordResponse)
authRouter.post("/reset-password", updatePassword)


module.exports= authRouter