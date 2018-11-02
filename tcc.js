var Express = require('express');
var Constantes = require('./misc/Constantes');
var App = Express();

// Imports estáticos
App.use('/jquery', Express.static(Constantes.JQUERY_DIR));
App.use('/bootstrap', Express.static(Constantes.BOOTSTRAP_DIR));
App.use('/css', Express.static(Constantes.CSS_DIR));
App.use('/js', Express.static(Constantes.JS_DIR));
App.use('/img', Express.static(Constantes.IMG_DIR));
App.use('/fonts', Express.static(Constantes.FONTS_DIR));

// Motor de renderização
App.set('views', Constantes.VIEWS_DIR);
App.set('view engine', 'pug');

// Rotas
App.get('/', (request, response) => response.render(Constantes.MAIN_VIEW));
App.get('/listar', (request, response) => response.render(Constantes.REPORTS_VIEW));

App.listen(9001);