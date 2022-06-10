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
UserSchema.methods.createJWT = function (){
  return jet.sign({userId:this._Id,name:this.name},'jwtSecret',{expiresIN:'30d'})
}
module.exports = mongoose.model('User', UserSchema);
