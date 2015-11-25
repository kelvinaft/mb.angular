'use strict';
define(['app'], function (app) {
	app.register.controller('ideasController', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
	   	ng.saludo = 'ideas controller'
	}]);
});
