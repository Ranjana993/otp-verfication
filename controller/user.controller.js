const sendMailer = require("../constants/sendMail");
const User = require("../models/user_model");
const bcrypt = require("bcrypt")


const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, } = req.body;
    if (!(name || email || password || mobile)) {
      return res.statius(400).json({ message: "All fields are required " })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ message: "User already exists ", success: false })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User(
      {
        name,
        email,
        password: hashedPassword,
        mobile,
        image: '/images/' + req.file.filename
      }
    )
    const newUserData = await newUser.save();

    const msg = '<p> hii ' + name + ', please <a href="http://localhost:8000/verify-email?id=' + newUserData ._id+'">verify </a>  you email + </p>'
    console.log(msg);

    await sendMailer(email, "Mail Verification", msg);
    return res.status(200).json({ message: "user saved successfully", success: true, newUserData })
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong ", success: false })
  }
}

const verifyEmail = async(req , res) =>{
  try {
    
  } catch (error) {
    
  }
}
module.exports = {
  registerUser,
  verifyEmail
}