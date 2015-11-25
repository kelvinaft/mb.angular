'use strict';
define(['app'], function (app) {
	app.register.controller('inicioController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
	   	ng.saludo = 'inicio controller'
	}]);
});
