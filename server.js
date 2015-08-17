var express = require('express');
var methodOverride = require('method-override');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var credentials = require('./controllers/credentials');
var flash = require('connect-flash');
var passport = require('passport');
var initPassport = require('./passport/init');


var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(){
  var app = express();

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');

  app.use(require('cookie-parser')(credentials.cookieSecret));
  app.use(require('body-parser').urlencoded({extended: false}));
  app.use(require('express-session')());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }))

  app.use(flash());

  initPassport(passport);

  app.get('/', function (req, res) {
    res.render('index', { message: req.flash('message') });
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  app.get('/signup', function(req, res){
    res.render('register', {message: req.flash('message')});
  });

  /* Handle Registration POST */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  app.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.use('/categories', require('./routes/category'));

  app.use(function(req, res, next){
    res.status(404);
    res.render('404');
  });

  var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
};