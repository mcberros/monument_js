var mongoose = require('mongoose');

var userSchema = mongoose.Schema({  id: String,
																		username: String,
																		password: String,
																		email: String,
																		firstName: String,
																		lastName: String
																 });
var User = mongoose.model('User', userSchema);
module.exports = User;