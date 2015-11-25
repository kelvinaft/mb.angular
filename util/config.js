module.exports = {
  	rethinkdb: {
    	host: 'localhost',
    	port: 28015,
    	authKey: '',
    	db: 'mubox',
    	tables: ['address','user','profile','permission','person','modules','access','document','ubigeo','listPermissions']
  	},
  	express: {
     	port: 3000
  	}
};