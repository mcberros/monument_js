var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: String,
  creator_id: String
});

var Category = mongoose.model('Category', categorySchema);

var categoryModel = {
	getCategories: function(cb) {
		Category.find({}, cb);
	},
	getCategory: function(id, cb) {
		Category.findOne({_id: id}, cb);
	},
	createCategory: function(name, creator_id, cb) {
		var cat = new Category({ name: name, creator_id: creator_id });
		cat.save(cb);
	},
	editCategory: function(id, cb) {
		Category.findOne({_id: id}, cb);
	},
	updateCategory: function(id, name, cb) {
		Category.update({_id: id}, {name: name}, cb);
	},
	deleteCategory: function(id, cb) {
		Category.findOneAndRemove({ _id: id }, cb);
	}
};

module.exports = categoryModel;
