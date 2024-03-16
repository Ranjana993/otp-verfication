const sendMailer = require("../constants/sendMail");
const User = require("../models/user_model");
const bcrypt = require("bcrypt")
const passwordReset = require("../models/resetPassword_model");
const randomstring = require("randomstring");


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

    const msg = '<p> hii ' + name + ', please <a href="http://localhost:8000/mail-verification?id=' + newUserData._id + '">verify </a>  you email + </p>'
    console.log(msg);

    await sendMailer(email, "Mail Verification", msg);
    return res.status(200).json({ message: "user saved successfully", success: true, newUserData })
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong ", success: false })
  }
}

const verifyEmail = async (req, res) => {
  try {
    if (req.query.id === undefined) {
      return res.render('404')
    }
    const user = await User.findOne({ _id: req.query.id })
    if (user) {
      if (user.is_verified === 1) {
        return res.render('mail-verification', { message: "email has already beedd verified  " })
      }
      await User.findByIdAndUpdate({ _id: req.query.id }, {
        $set: {
          is_verified: 1
        }
      })
      return res.render('mail-verification', { message: "mail verified successfully " })
    }
    else {
      return res.render('mail-verification', { message: "user not found" })
    }

  } catch (error) {
    console.log(error.message);
    return res.render('404')
  }
}


const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide your email", success: false })
    }
    const existUser = await User.findOne({ email: email })
    if (!existUser) {
      return res.status(400).json({ message: "Email not found", success: false });

    }
    if (existUser.is_verified === 1) {
      return res.status(400).json({ message: "email is already verified ", success: false });
    }

    const msg = '<p> hii ' + existUser.name + ', please <a href="http://localhost:8000/mail-verification?id=' + existUser._id + '">verify </a>  you email + </p>'
    console.log(msg);

    await sendMailer(email, "Mail Verification", msg);
    return res.status(200).json({ message: "Verifiaction link has been sended to your email Id", success: true })

  }
  catch (error) {
    return res.status(400).json({ message: "Something went wrong ", success: false })
  }
}





// forget password 
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    if (!email) {
      return res.status(400).json({ message: "Please provide your email", success: false })
    }
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({ message: "Email not found", success: false });
    }

    const randomString = randomstring.generate();

    const msg = '<p>Hii ' + existUser.name + ' , Please click <a href="http://localhost:8000/reset-password?token=' + randomString + '">Here</a> to reset your password .</p>'


    await passwordReset.deleteMany({user_id:existUser._id})
    const data = await passwordReset({
      user_id: existUser._id,
      token: randomString
    }).save();

    await sendMailer(email, "Password reset ", msg);

    return res.status(200).json({
      message: "Successfully  reset password link send to your email please check ",
      success: true, data
    })
  }
  catch (error) {
    return res.status(400).json({ message: "Something went wrong ", success: false })
  }
}






module.exports = {
  registerUser,
  verifyEmail,
  sendEmailVerification,
  resetPassword
}