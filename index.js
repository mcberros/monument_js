//Connection to DB
var mongoose = require('mongoose');
var startServer = require('./server');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("connection to mongo opened");
	startServer();
});

