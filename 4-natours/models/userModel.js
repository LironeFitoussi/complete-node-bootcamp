const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  photos: String,
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: [8, 'Password must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    //  TODO: validate password
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
