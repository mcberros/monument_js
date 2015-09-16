var mongoose = require('mongoose');

var userSchema = mongoose.Schema({  id: String,
																		username: String,
																		password: String,
																		email: String,
																		firstName: String,
																		lastName: String,
																		collections: mongoose.Schema.Types.Mixed
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
	},
	getCollections: function(user_id, cb){
		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			cb(null, user.collections);
		});
	},
	getOneCollection: function(user_id, collection_id, cb){
		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			var collection = user.collections[collection_id]
			cb(null, collection);
		});
	},
	createCollection: function(user_id, name, cb){
		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			//Lo dejo aqui
			var collection = user.collections.addCollection;
			cb(null, collection);
		});
	}
};

module.exports = userModel;