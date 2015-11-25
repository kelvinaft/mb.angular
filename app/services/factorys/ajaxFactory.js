'use strict';
//define(['modules/factorys'], function (module) {
define(['modules/factorys'], function (module) {
	module.factory('ajaxFactory', function ($http,$q){
		return {
			request: function (alias,parameters,success,error,before){
				var p = angular.copy(parameters);
				angular.forEach(p, function (value, key) {
                    p[key] = angular.toJson(value);
                });
                var mapParameters = {
                    alias: alias,
                    parametro: p,
                    nuevo: true
                };
                var configuration = {
                    method: 'POST',
                    url: APP.DATA.CONFIG.URL_BASE + APP.DATA.CONFIG.SERVICE_BASE,
                    data: mapParameters
                };
                console.error(configuration);
                this.send(configuration, success, error, before);
			},
			send: function (configuration, success, error, before) {
				$http(configuration).
					success(function (data, status, headers, config){
						console.log('>>>>>>>>>');
						console.info(data);
						console.info(status);
						console.info(headers);
						console.info(config);
						console.log('>>>>>>>>>');
						var response = { success: false, msg: "Error inesperado en el sistema" };
						try{
							console.log('data its defined: '+angular.isDefined(data));
							if (angular.isDefined(data)) {
								if (angular.isDefined(data.result)) {
									if (angular.isDefined(data.success) && data.success) {
										response = data;
									} else{
										response = { success: false, msg: data.msg };
									};
								}else{
									if (angular.isDefined(data.success)) {
										response = { success: false, msg: data.msg };
									};
								};
                            };
						}catch(ex){
							response = { success: false, msg: ex.message };
						}finally{
							if (angular.isDefined(success) && angular.isFunction(success))
                                success(response);
						}
					}).error(function (data, status, headers, config){
						if (angular.isDefined(error) && angular.isFunction(error))
							error(data);
					});
			}
		};
	});
});