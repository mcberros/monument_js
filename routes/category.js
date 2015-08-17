var categoryController = require('../controllers/category.js');
var express = require('express');

var router = express.Router();

module.exports = function(isAuthenticated){

	router.use(isAuthenticated);

	router.get('/', function (req, res) {
		categoryController.index(res);
	});

	router.get('/new', function (req, res) {
	  categoryController.createForm(res);
	});

	router.get('/:id', function (req, res) {
		categoryController.show(req, res);
	});

	router.get('/:id/edit', function (req, res) {
		categoryController.editForm(req, res);
	});

	router.post('/', function(req, res){
		categoryController.create(req, res);
	});

	router.put('/:id', function(req, res){
		categoryController.update(req, res);
	});

	router.delete('/:id', function (req, res){
		categoryController.remove(req, res);
	});


	return router;
};
