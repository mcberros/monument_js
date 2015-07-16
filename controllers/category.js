var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

var categorySchema = mongoose.Schema({
  name: String
});

var Category = mongoose.model('Category', categorySchema);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("connection to mongo opened");
	categories.forEach(function(name_cat){
		var cat = new Category({ name: name_cat });
		cat.save(function(err) {
			if(err) return console.log("Error saving category: "+name_cat);
		});
	})
});

var categories = [
	"Palace",
	"Temple",
	"Moderne",
	"Old"
];

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