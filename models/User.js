const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, 'Please provide name'],
    // match for email validation
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      'Please enter email',
    ],
    unique: true,
    // unique so email can't be the same
  },
  password: {
    type: String,
    require: [true, 'Please provide name'],
    minlength: 6,
    maxlength: 12,
  },
});
module.exports = mongoose.model('User', UserSchema);
