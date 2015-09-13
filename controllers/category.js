var categoryModel = require('../models/category.js');

var controller = {
	index: function(req, res) {
		var current_user_id = req.user._id.toString();

		categoryModel.getCategories(function(err, categories) {
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}

			categories.forEach(function(category){
				category.editable = (category.creator_id === current_user_id);
			});

	  	res.render('categories/index', {categories: categories});
  	});
	},
	show: function(req, res) {
		var id = req.params.id;

		categoryModel.getCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
	  	res.render('categories/show', {category: category});
	  });
	},
	createForm: function(res) {
		res.render('categories/new', { csrf: 'CSRF token goes here' });
	},
	create: function(req, res) {
		console.log('CSRF token (from hidden form field): ' + req.body._csrf);
		console.log('Name (from visible form field): ' + req.body.name);

		var name = req.body.name,
				current_user_id = req.user._id.toString();

		categoryModel.createCategory(name, current_user_id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
			res.redirect('/categories/' + category._id);
		});
	},
	editForm: function(req, res) {
		var id = req.params.id,
				current_user_id = req.user._id.toString();

		categoryModel.editCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
			if(category.creator_id === current_user_id) {
				res.render('categories/edit', { category: category, csrf: 'CSRF token goes here' });
			} else {
				res.status(401);
				return res.render('401');
	  	}
	  });
	},
	update: function(req, res) {
		var id = req.params.id;
		var name = req.body.name,
				current_user_id = req.user._id.toString();

		categoryModel.getCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
			if(category.creator_id === current_user_id) {
				categoryModel.updateCategory(id, name, function(err){
					if(err) {
						console.log(err);
						res.status(500);
						return res.render('500');
					}
					res.redirect('/categories/' + id);
				});
			} else {
				res.status(401);
				return res.render('401');
			}
		});
	},
	remove: function(req, res) {
		var id = req.params.id,
				current_user_id = req.user._id.toString();

		categoryModel.getCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
			if(category.creator_id === current_user_id) {
				categoryModel.deleteCategory(id, function(err){
					if(err) {
						console.log(err);
						res.status(500);
						return res.render('500');
					}
					res.redirect('/categories');
				});
			} else {
				res.status(401);
				return res.render('401');
			}
		});
	}
};

module.exports = controller;

