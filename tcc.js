var Express = require('express');
var Constantes = require('./misc/constantes');
var App = Express();

// Imports estáticos
App.use('/jquery', Express.static(Constantes.JQUERY_DIR));
App.use('/bootstrap', Express.static(Constantes.BOOTSTRAP_DIR));

// Motor de renderização
App.set('views', Constantes.VIEWS_DIR);
App.set('view engine', 'pug');

// Rotas
App.get('/', function(request, response) {
    response.render(Constantes.MAIN_VIEW, {
        links: [{url: "/", name: "Home"},{url: "/about", name: "About"},{url: "/sitemap", name: "Sitemap"}]
    });
});

App.listen(9001);