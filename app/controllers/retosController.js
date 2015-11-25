'use strict';
define(['app'], function (app) {
	app.register.controller('retosController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
	   	ng.saludo = 'retos controller'
	}]);
});
