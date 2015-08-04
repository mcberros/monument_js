//Connection to DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("connection to mongo opened");
});

//App
var express = require('express');
var app = express();
var methodOverride = require('method-override');

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var categoryModel = require('./models/category.js');
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

app.get('/categories', function (req, res) {
	categoryController.index(res);
});

app.get('/categories/new', function (req, res) {
  categoryController.createForm(res);
});

app.get('/categories/:id', function (req, res) {
	categoryController.show(req, res);
});

app.get('/categories/:id/edit', function (req, res) {
	categoryController.editForm(req, res);
});

app.post('/categories', function(req, res){
	categoryController.create(req, res);
});

app.put('/categories/:id', function(req, res){
	categoryController.update(req, res);
});

app.delete('/categories/:id', function (req, res){
	categoryController.remove(req, res);
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