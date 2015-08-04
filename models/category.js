var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: String
});

var Category = mongoose.model('Category', categorySchema);

exports.getCategories = function(cb) {
	Category.find({}, cb);
};

exports.getCategory = function(id, cb) {
	Category.findOne({_id: id}, cb);
};

exports.createCategory = function(name, cb) {
	var cat = new Category({ name: name });
	cat.save(cb);
};

exports.editCategory = function(id, cb) {
	Category.findOne({_id: id}, cb);
};

exports.updateCategory = function(id, name, cb) {
	Category.update({_id: id}, {name: name}, cb);
};

exports.deleteCategory = function(id, cb) {
	Category.findOneAndRemove({ _id: id }, cb);
};