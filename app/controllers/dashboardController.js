'use strict';
define(['app'], function (app) {
	app.register.controller('dashboardController', ['$scope','ajaxFactory', function($scope,ajaxFactory) {
	   	var ng = $scope;
	   	console.log('URL: '+APP.DATA.CONFIG.URL_BASE);
	   	ng.saludo = 'Ver usuario';
	   	ng.usuarios = '';
	   	ng.listarUsuarios = function (){
	   		console.log('ESTOY EN EL LISTAR USUARIOS');
	   		var parametro = {
	   			usuario: 'kflores'
	   		};
	   		ajaxFactory.request('todos',parametro,function(data){
	   			console.info('**********DATA*********');
	   			console.info(data);
	   			ng.usuarios = data.result;
	   		}, function (error){
	   			console.error('error ajaxfactory');
	   		}, function(){
	   			console.error('not faound ajaxfactory');
	   		});
	   	};
	}]);
});
