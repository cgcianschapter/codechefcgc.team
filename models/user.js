const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   username: String,
   password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;