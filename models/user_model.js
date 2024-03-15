const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  mobile: {
    type: String,
    retuired: true
  },
  password: {
    type: String,
    require: true
  },
  is_verified: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

const User = mongoose.model("User", userSchema);
module.exports = User;