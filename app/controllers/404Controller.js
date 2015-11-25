'use strict';
define(['app'], function (app) {
	app.register.controller('404Controller', ['$scope','$http', function($scope,$http) {
	   	var ng = $scope;
	   	ng.error = 'Error con la carga de la página'
	}]);
});
