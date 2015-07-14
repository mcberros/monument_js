var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var categoryController = require('./controllers/category.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/categories', function (req, res) {
  res.render('categories', {categories: categoryController.getCategories()});
});

app.use(function(req, res, next){ res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){ console.error(err.stack);
  res.status(500);
  res.render('500');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});