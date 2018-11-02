var Express = require('express');
var App = Express();
var Constantes = require('../helpers/Constantes');
var Rotas = require('../helpers/Rotas');

this.init = function() {
    // Imports estáticos
    App.use('/css', Express.static(Constantes.CSS_DIR));
    App.use('/js', Express.static(Constantes.JS_DIR));
    App.use('/img', Express.static(Constantes.IMG_DIR));
    App.use('/fonts', Express.static(Constantes.FONTS_DIR));

    // Motor de renderização
    App.set('views', Constantes.VIEWS_DIR);
    App.set('view engine', 'pug');

    // Rotas
    Rotas.rotear(App);

    App.listen(9001);
    console.log('Servidor rodando na porta 9001');
};

module.exports = this;