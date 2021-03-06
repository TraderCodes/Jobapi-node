const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  },
});
//
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
UserSchema.methods.comparePassword = async function (passwords) {
  const isMatch = await bcrypt.compare(passwords, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
