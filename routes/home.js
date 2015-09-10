var express = require('express');

var router = express.Router();

module.exports = function(isAuthenticated){

	router.get('/', function (req, res) {
    res.render('index', { message: req.flash('message') });
  });

  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { isAuth: req.isAuthenticated(), user: req.user });
  });

	return router;
};