var express = require('express');
var methodOverride = require('method-override');
var handlebars = require('express-handlebars').create({ defaultLayout:'main',
                                                        partialsDir: ['views/partials/']
                                                      });
if (process.env.NODE_ENV !== 'production') {
  var credentials = require('./controllers/credentials');
}
var flash = require('connect-flash');
var passport = require('passport');
var initPassport = require('./passport/init');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  var isAuth = req.isAuthenticated();
  res.locals.isAuth = isAuth;

  if (isAuth)
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
};

module.exports = function(){
  var app = express();

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');

  app.use(require('cookie-parser')(process.env.COOKIE_SECRET || credentials.cookieSecret)); //It is necessary?
  app.use(require('body-parser').urlencoded({extended: false}));
  app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET || credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
  }));
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

  app.use('/', require('./routes/home')(isAuthenticated));

  app.use('/', require('./routes/auth')(passport));

  app.use('/categories', require('./routes/category')(isAuthenticated));

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