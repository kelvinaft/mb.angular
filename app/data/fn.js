var APP = APP || {};
APP.DATA = APP.DATA || {};
APP.DATA.FN = APP.DATA.FN || {};
APP.DATA.FN.MENU = APP.DATA.FN.MENU || {};

//mostrar mensajes
APP.DATA.FN.showMessageStart = function (code) {
    var message = '';
    switch (code) {
        case 'CODE001':
            message = 'Iniciando el sistema...';
            break;
        case 'CODE002':
            message = 'Obteniendo acceso...';
            break;
        case 'CODE003':
            message = 'Ocurrió un error, presione la tecla F5';
            break;
        case 'CODE004':
            message = 'Su navegador ' + platform.name + ' ' + platform.version + ' está obsoleto, tiene que actualizarlo.';
            break;
        default:
            message = '...';
            break;
    }
    $("#loading-msg").text(message);
};

APP.DATA.FN.showLoadingPage = function () {
    $('.mbx-dashboard').prepend('<div class="addLoadingPage" style="background: #000;height: 100%;position: fixed;left: 0;top: 0;width: 100%;z-index: 20000;opacity: 0.5;"></div>');
};

APP.DATA.FN.removeLoadingPage = function (fn) {
    setTimeout(function () {
        $('.mbx-dashboard>.addLoadingPage').remove();
        $('#dashboard').show();
        if (typeof fn !== 'undefined') {
            fn();
        }
    }, 500);
};

//remover menssaje preload
APP.DATA.FN.removeMessageStart = function () {
    setTimeout(function () {
        $('.loading').remove();
        $('.loading-mask').fadeOut('fast', function () {
            $('#dashboard').fadeIn('fast');
            $('#loading-mask').remove();
        });
    }, 2000);
};

APP.DATA.FN.getInitialize = function (fnSuccess){
     fnSuccess();
};