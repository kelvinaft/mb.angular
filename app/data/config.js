var APP = APP || {};
APP.DATA = APP.DATA || {};
APP.DATA.CONFIG = APP.DATA.CONFIG || {};

APP.DATA.CONFIG.AMBITO = 'LOCAL';
APP.DATA.CONFIG.AMBITO = 'SERVER';

APP.DATA.CONFIG.NAMESPACE = 'ui.app';

APP.DATA.CONFIG.URL_BASE = (APP.DATA.CONFIG.AMBITO == 'LOCAL') ? window.location.origin + "/" : window.location.origin + '/';

APP.DATA.CONFIG.SERVICE_BASE = 'consultar';
APP.DATA.CONFIG.URLS = [
	    	{
	    		'id':1,
	    		'temp':'inicio',
	    		'desc':'Inicio'
	    	},
	    	{
	    		'id':2,
	    		'temp':'ideas',
	    		'desc':'Ideas'
	    	},
	    	{
	    		'id':3,
	    		'temp':'retos',
	    		'desc':'Retos'
	    	}
	    ];