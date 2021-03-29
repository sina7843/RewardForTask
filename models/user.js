const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   Name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
   },
   Email: {
      type: String,
      required: [true, 'Please Enter Your Phone Number'],
      unique: [true, 'This Phone Number Has Already been submitted']
   },
   password: {
      type: String,
      required: [true, 'Please Provide a Password'],
      select: false
   },
   Wallet: { type: Number, default: 0 },
})

const User = mongoose.model('User', userSchema)

module.exports = User;