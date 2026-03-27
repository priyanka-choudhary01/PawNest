const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String
  },
  token :{
    type:String
  },
  role: {
    type: String,
    default: "user"
  },
   otp: String,
  otpExpiry: Date,
  otpLastSent: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);