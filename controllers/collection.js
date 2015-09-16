var userModel = require('../models/user');

var controller = {
	index: function(req, res) {
		var current_user_id = req.user._id.toString(),
				user_id = req.params.user_id;

		if(user_id === current_user_id) {
	 		userModel.getCollections(user_id, function(err, collections) {
				if(err) {
					console.log(err);
					res.status(500);
					return res.render('errors/500');
				}
		  	res.render('collections/index', { user_id: user_id, collections: collections });
	  	});
		} else {
			res.status(401);
			return res.render('errors/401');
		}
	}
};

module.exports = controller;

