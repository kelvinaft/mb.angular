'use strict';
define(['services/routeResolver'],function () {
	var app = angular.module('appModule', ['ngRoute','ngResource','routeResolverServices']);

	console.info('app.js');

	app.config(['$routeProvider','routeResolverProvider','$controllerProvider','$compileProvider','$filterProvider','$httpProvider','$provide',
		function ($routeProvider,routeResolverProvider,$controllerProvider,$compileProvider,$filterProvider,$provide) {
		
		app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

		var route = routeResolverProvider.route;
		angular.forEach(APP.DATA.CONFIG.URLS, function(obj){
			$routeProvider.when('/'+obj.temp, route.resolve(obj.temp));
		});
		//rutas fijas
		$routeProvider.when('/dashboard', route.resolve('dashboard'));
		$routeProvider.when('/404', route.resolve('404'));
		$routeProvider.when('/', route.resolve('dashboard'));

		$routeProvider.when('/', { redirectTo: '/dashboard' });
		$routeProvider.otherwise({ redirectTo: '/dashboard' });
	}]);

	app.controller('appController', ['$scope','$rootScope','$location','$http', function($scope,$rootScope,$location,$http) {
	    var ng = $scope;

	    ng.demo = 'HOLA SOY UN DEMO';
	    $rootScope.$on('$routeChangeStart', function (event, next, current) {
	    	APP.DATA.FN.showLoadingPage();
	    	ng.urls = APP.DATA.CONFIG.URLS;
	    	console.info('Location: '+$location.path());
		    console.log(ng.menuDemo);
	    });

	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	    	console.log('CURRENT: '+current.loadedTemplateUrl);
            APP.DATA.FN.removeLoadingPage();
        });

	    $rootScope.$on("$routeChangeError", function (event) {
            $location.path('/404');
        });

	    ng.menus = function(){
			console.info('MENUS');
			ng.menuDemo = APP.DATA.CONFIG.URLS;
		};
	}]);

	return app;
});