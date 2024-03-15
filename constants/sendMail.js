const nodemailer = require("nodemailer")




const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  }
})



const sendMailer = async (email, subject, content) => {
  try {
    var mail_options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: content
    }

    transporter.sendMail(mail_options, (err, info) => {
      if (err) { return err.message }
      console.log(`mail sent to : ${info.messageId} `);
    })

  } catch (error) {
    console.log(error.message);
  }
}


module.exports = sendMailer 