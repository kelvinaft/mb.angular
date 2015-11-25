var r = require('rethinkdb');

var dbConfig = {
	host: 'localhost',
	port: 28015,
	db  : 'demo',
};

module.exports.setup = function (){
	onConnect(function (err, connection) {
	});
};

module.exports.getUsers = function (argument) {
	onConnect(function (err, connection) {
		r.table('user').run(connection, function(){
			
		});
	});
};

function onConnect(callback) {
  	r.connect(dbConfig, function(err, connection) {
	    connection['_id'] = Math.floor(Math.random()*10001);
	    callback(err, connection);
  	});
};

