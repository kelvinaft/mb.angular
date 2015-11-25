angular.element(document).ready(function () {

	require.config({
        urlArgs: 'v=' + (new Date()).getTime(),
        waitSeconds: 0
    });

	require([
		'modules/factorys',

		'services/factorys/ajaxFactory',
		
		'lumx',
		'app'
		],
		function (app){
			angular.bootstrap(angular.element(document), [
				'appModule',
				'lumx',
				APP.DATA.CONFIG.NAMESPACE + '.factorys'
			]);
			APP.DATA.FN.showMessageStart('CODE001');
			APP.DATA.FN.removeMessageStart();
			// APP.DATA.FN.getInitialize(function (rpta){
				
			// 	if (typeof rpta !== 'undefined') {
			// 		if (rpta.success) {

			// 		}else{

			// 		}

			// 	} else {

			// 	}

				
			// });
		});
});