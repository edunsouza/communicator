const Initializer = require('./app/Initializer');
const Manager = require('./controllers/Manager');

Initializer.init();

Manager.treinarSistema();
Manager.buscarPublicacoes();

// Escutar publicações do facebook
console.log('Escutando publicações');
ouvir();

function ouvir() {
    setTimeout(function() {
        console.log('Buscando novas publicações');
        Manager.buscarPublicacoes();
        ouvir();
    }, 10000);
}