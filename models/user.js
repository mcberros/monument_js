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
		var collection;

		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			collection = user.collections[collection_id];
			collection.id = collection_id;
			cb(null, collection);
		});
	},
	createCollection: function(user_id, name, cb){
		User.findById(user_id, 'collections', function(err, user) {
			if(err)
				return cb(err);
			var newCollection = {},
					newCollectionId,
					collections = user.collections,
					collectionKeys,
					collection;

			if(collections === undefined || collectionKeys.length === 0) {
				newCollection = { 1: {name: name, monuments:{}}};
				collections = newCollection;
			} else {
				collectionKeys = Object.keys(collections);
				collectionKeys.forEach(function(key){
					collection = collections[key];
					if(collection['name'] == name) {
						return cb('collection already exists');
					} else {
						newCollectionId = collectionKeys.sort()[collectionKeys.length-1] + 1;
						collections[newCollectionId] = {name: name, monuments: {}};
						newCollection = {newCollectionId: {name: name, monuments: {}}};
					}
				});
			}
			user.collections = collections;
			user.save();
			cb(null, newCollection);
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
				console.log('hola');
				if(err)
					return cb(err);

				cb(null, collection);
			});
		})
	},
	removeCollection: function(user_id, collection_id, cb){
	}
};

module.exports = userModel;