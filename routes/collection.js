var collectionController = require('../controllers/collection.js');
var express = require('express');

var router = express.Router();

module.exports = function(isAuthenticated){

	router.use(isAuthenticated);

	router.get('/users/:user_id/collections', function (req, res) {
		collectionController.index(req, res);
	});

	// router.get('/new', function (req, res) {
	//   collectionController.createForm(res);
	// });

	// router.get('/:id', function (req, res) {
	// 	collectionController.show(req, res);
	// });

	// router.get('/:id/edit', function (req, res) {
	// 	collectionController.editForm(req, res);
	// });

	// router.post('/', function(req, res){
	// 	collectionController.create(req, res);
	// });

	// router.put('/:id', function(req, res){
	// 	collectionController.update(req, res);
	// });

	// router.delete('/:id', function (req, res){
	// 	collectionController.remove(req, res);
	// });


	return router;
};
