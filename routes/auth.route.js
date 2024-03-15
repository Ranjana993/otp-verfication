const express = require("express");
const { verifyEmail } = require("../controller/user.controller");

const authRouter  = express.Router();
authRouter.get("/mail-verification", verifyEmail)

module.exports= authRouter