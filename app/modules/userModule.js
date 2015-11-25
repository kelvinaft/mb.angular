//var userModel = require('../models/userModel');

var userModule = function(server){

	var isLoggedIn = function (req,res,next){
		if (req.session.account) {
			res.redirect('/index');
			return;
		};
		next();
	};

	server.get('/', isLoggedIn, function (req, res) {
		res.render('login',{});
	});

	server.post('/log-in', function (req, res) {
		req.session.account = req.body.account;
		req.session.password = req.body.password;
	    res.redirect('/');
	});

	server.get('/index', function (req,res){
		res.sendfile('index.html');
	});

	
};

module.exports = userModule;