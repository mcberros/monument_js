var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var categoryController = require('./controllers/category.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/categories', function (req, res, next) {
	categoryController.getCategories(function(err, categories){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		}
  	res.render('categories/index', {categories: categories});
  });
});

app.get('/category/:id', function (req, res, next) {
	var id = req.params.id;

	categoryController.getCategory(id, function(err, category){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		}
  	res.render('categories/show', {category: category});
  });
});

app.use(function(req, res, next){
	res.status(404);
  res.render('404');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});