var userModel = require('../models/user');

var controller = {
	index: function(req, res) {
		var current_user_id = req.user._id.toString(),
				user_id = req.params.user_id,
				collectionsKeys;

		if(user_id === current_user_id) {
	 		userModel.getCollections(user_id, function(err, collections) {
				if(err) {
					console.log(err);
					res.status(500);
					return res.render('errors/500');
				}

				collectionsKeys = Object.keys(collections);

				collectionsKeys.forEach(function(key){
					collection = collections[key];
					collection.id = key;
					collections[key] = collection;
				});

		  	res.render('collections/index', { user_id: user_id, collections: collections });
	  	});
		} else {
			res.status(401);
			return res.render('errors/401');
		}
	},
	show: function(req, res) {
		var current_user_id = req.user._id.toString(),
				user_id = req.params.user_id,
				collection_id = req.params.id;

		if(user_id === current_user_id){
			userModel.getOneCollection(user_id, collection_id, function(err, collection){
				if(err) {
					console.log(err);
					res.status(500);
					return res.render('errors/500');
				}

		  	res.render('collections/show', { user_id: user_id, collection: collection });
		  });
		} else {
			res.status(401);
			return res.render('errors/401');
		}
	},
	createForm: function(req, res) {
		var current_user_id = req.user._id.toString(),
				user_id = req.params.user_id;

		if(user_id === current_user_id) {
	 		res.render('collections/new', { user_id: user_id, csrf: 'CSRF token goes here' });
		} else {
			res.status(401);
			return res.render('errors/401');
		}
	},
	create: function(req, res) {
		console.log('CSRF token (from hidden form field): ' + req.body._csrf);

		var name = req.body.name,
				current_user_id = req.user._id.toString(),
				user_id = req.params.user_id;

		if(user_id === current_user_id){
			userModel.createCollection(current_user_id, name, function(err, collection){
				if(err) {
					console.log(err);
					res.status(500);
					return res.render('errors/500');
				}
				res.redirect('/users/'+ current_user_id +'/collections/' + collection.id);
			});
		} else {
			res.status(401);
			return res.render('errors/401');
		}
	}
};

module.exports = controller;

