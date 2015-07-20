var express = require('express');
var app = express();
var methodOverride = require('method-override');

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var categoryController = require('./controllers/category.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded({extended: false}));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

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

app.get('/categories/new', function (req, res) {
  res.render('categories/new', { csrf: 'CSRF token goes here' });
});

app.get('/categories/:id', function (req, res, next) {
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

app.get('/categories/:id/edit', function (req, res) {
	var id = req.params.id;

	categoryController.editCategory(id, function(err, category){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		}
  	res.render('categories/edit', { category: category, csrf: 'CSRF token goes here' });
  });
});

app.post('/categories', function(req, res){
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field): ' + req.body.name);

	name = req.body.name;

	categoryController.createCategory(name, function(err, category){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		};
		res.redirect('/categories/' + category._id);
	});
});

app.put('/categories/:id', function(req, res){
	var id = req.params.id;
	var name = req.body.name;

	categoryController.updateCategory(id, name, function(err){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		};
		res.redirect('/categories/' + id);
	});
});

app.delete('/categories/:id', function (req, res){
	var id = req.params.id;

	categoryController.deleteCategory(id, function(err, category){
		if(err) {
			console.log(err);
			res.status(500);
			return res.render('500');
		};
		res.redirect('/categories');
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