var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    pass: String,
    token: String,
    tokenVersion: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;
