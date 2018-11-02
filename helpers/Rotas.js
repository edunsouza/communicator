var Constantes = require('./Constantes');
var MainCtrl = require(Constantes.CONTROLLERS_DIR + '/Main');
var DashboardCtrl = require(Constantes.CONTROLLERS_DIR + '/Dashboard');

function render(view, params) {
    return function (req, resp) {
        resp.render(view, params);
    };
}

function rotear(app) {
    // Main
    app.get(Constantes.ROTA_MAIN, render(Constantes.MAIN_VIEW, new MainCtrl()));
    // Dashboard
    app.get(Constantes.ROTA_DASHBOARD, render(Constantes.DASH_VIEW, new DashboardCtrl()));
};

module.exports.rotear = rotear;