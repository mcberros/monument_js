var categoryModel = require('./models/category.js');

var controller = {
	index: function(res) {
		categoryModel.getCategories(function(err, categories) {
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
	  	res.render('categories/index', {categories: categories});
  	});
	};

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
	};

	createForm: function(res) {
		res.render('categories/new', { csrf: 'CSRF token goes here' });
	};

	create: function(req, res) {
		console.log('CSRF token (from hidden form field): ' + req.body._csrf);
		console.log('Name (from visible form field): ' + req.body.name);

		name = req.body.name;

		categoryModel.createCategory(name, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			};
			res.redirect('/categories/' + category._id);
		});
	};

	editForm: function(req, res) {
		var id = req.params.id;

		categoryModel.editCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			}
	  	res.render('categories/edit', { category: category, csrf: 'CSRF token goes here' });
	  });
	};

	update: function(req, res) {
		var id = req.params.id;
		var name = req.body.name;

		categoryModel.updateCategory(id, name, function(err){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			};
			res.redirect('/categories/' + id);
		});
	};

	remove: function(req, res) {
		var id = req.params.id;

		categoryModel.deleteCategory(id, function(err, category){
			if(err) {
				console.log(err);
				res.status(500);
				return res.render('500');
			};
			res.redirect('/categories');
		});
	};
};

module.exports = controller;

