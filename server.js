//Dependencias
var express 	= require('express'),
	async		= require('async'),
	bodyParser 	= require('body-parser'),
	cookieParser= require('cookie-parser'),
	session		= require('express-session'),
	swig		= require('swig'),
	_ 			= require('underscore'),
	r 			= require('rethinkdb');

//Archivo config
var config		= require('./util/config');

var rediStore	= require('connect-redis')(session);

var server 	= express();

//Middleware
function listAllUsers (req,res,next) {
	var rsp = {};
	r.table('user')
		.orderBy({index: 'user'})
		.run(server._rdbConn, function(err, cursor) {
			if(err) {
				rsp.success = false;
				rsp.msg = 'Error en la conexión con la base de datos';
				rsp.err = err;
				res.json(rsp);
			}
			cursor.toArray(function(err, result) {
			 	if(err) {
					rsp.success = false;
					rsp.msg = 'Error en la obtención de información';
					rsp.err = err;
					res.json(rsp);
			 	}
			 	rsp.success = true;
			 	rsp.result = result;
				rsp.msg = 'Carga de datos correctamente';
			  	res.json(rsp);
			});
		});
};

function getOperation(req,res,next){
	var parametros = req.body;
	res.redirect('/'+parametros.alias);
};

//Middlware not found
function notfound404(req,res,next){
	res.status(404).end('not fount')
};

function err505(err,req,res,next){
	console.error(err.stack);
	res.status(500).json({err:err.message});
};

//Star server
function startServer(connection){
	server._rdbConn = connection;
	server.listen(config.express.port);
	console.log('Start server');
};

//Config server
server.engine('html', swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

server.use(express.static('./public'));
server.use(express.static('./app'));

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false })); 
server.use(bodyParser.json());

server.use(session({
	secret:"secret key",
	resave: false,
  	saveUninitialized: true,
  	cookie: new rediStore({})
}));

//Routes
server.get('/', function (req, res) {
		res.render('login',{});
	});

server.route('/todos')
  	.get(listAllUsers)

server.route('/consultar')
	.post(getOperation)

//Modules
var userModule = require('./app/modules/userModule');
userModule(server);

//Async
async.waterfall([
    function connect(callback) {
    	r.connect(config.rethinkdb, callback);
    },
    function createDatabase(connection, callback) {
        r.dbList().contains(config.rethinkdb.db).do(function(containsDB){
        	return r.branch(
        			containsDB,
        			{created: 0},  
        			r.dbCreate(config.rethinkdb.db)
        		);
        }).run(connection, function(err){
        	callback(err, connection);
        });
    },
    function createTable(connection, callback) {
  		r.tableList().contains('user').do(function(containsTable){
	    	return r.branch(
	    			containsTable,
	    			{created:0},
	    			r.tableCreate('user')
	    		);
	        }).run(connection,function(err){
	        	callback(err,connection);
	        });
    }
], function (err, connection) {
	if (err) {
		console.info('Entraré al error');
		console.error(err);
		process.exit(1);
		return;
	};
	startServer(connection);
});