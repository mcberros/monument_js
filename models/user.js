var mongoose = require('mongoose');
var newCollectionSet = require('./collection_set');

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
	createUser: function(username, password, email, firstName, lastName, cb){
		var user = new User({ username: username, password: password, email: email, firstName: firstName, lastName: lastName});
		user.save(cb);
	},
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
		var collection;

		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			collection = user.collections[collection_id];
			cb(null, collection);
		});
	},
	createCollection: function(user_id, name, cb){
		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			var newCollection,
					collectionsData = user.collections;

			collectionSet = newCollectionSet(collectionsData);

			newCollection = collectionSet.append({name: name, monuments:{}});

			User.update({_id: user_id}, {collections: collectionSet.data()}, function(err, user){
				if(err)
					return cb(err);
				cb(null, newCollection);
			});
		});
	},
	editCollection: function(user_id, collection_id, name, cb){
		var collection,
				collections;

		User.findById(user_id, 'collections', function(err, user){
			if(err)
				return cb(err);

			collections = user.collections;

			collection = collections[collection_id];
			collection['name'] = name;
			collections[collection_id] = collection;

			User.update({_id: user_id}, {collections: collections}, function(err, user){
				if(err)
					return cb(err);

				cb(null, collection);
			});
		})
	},
	removeCollection: function(user_id, collection_id, cb){
		//Category.findOneAndRemove({ _id: id }, cb);
		var collections;

		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);

			collections = user.collections;
			delete collections[collection_id];

			User.update({_id: user_id}, {collections: collections}, function(err, user){
				if(err)
					return cb(err);

				cb(null);
			})

		})
	}
};

module.exports = userModel;

