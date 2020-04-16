var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    min : 4,
    max:255
  },
  password: {
    type: String,
    required: true,
    min : 6,
    max : 1024
  }
  // created: {
  //   type: Date,
  //   default: Date.now
  // }
});


var User = mongoose.model('User', userSchema, 'users');

module.exports = User;