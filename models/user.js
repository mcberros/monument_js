var mongoose = require('mongoose');

var userSchema = mongoose.Schema({  id: String,
																		username: String,
																		password: String,
																		email: String,
																		firstName: String,
																		lastName: String//,
																		//collections: Schema.Types.Mixed
																 });

var User = mongoose.model('User', userSchema);
//collections: {id_col_1: { name: String, monuments: { id_monument_1: {name: String}}},
//							id_col_2: { name: String, monuments: { id_monument_2: {name: String}}}}

var userModel = {
	getUserById: function(id, cb) {
		User.findById(id, cb);
	},
	getUser: function(search_param, cb) {
		User.findOne(search_param, cb);
	}
};

module.exports = userModel;