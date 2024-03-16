const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  }
})


const passwordReset = mongoose.model("passwordReset", resetPasswordSchema)


module.exports = passwordReset

