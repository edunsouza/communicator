var Constantes = require('../helpers/Constantes');

module.exports = function () {
    this.autor = 'Eduardo Souza';
    this.curso = 'Análise e Desenvolvimento de Sistemas';
    this.titulo = 'Analisador de publicações do Facebook';
    this.btnListar = {
        label: 'Iniciar',
        link: Constantes.ROTA_DASHBOARD
    };
};