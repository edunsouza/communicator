var Analyser = require('./Analyser');

function getSentimento(texto, stemizarAfinn) {
    // var texto = "Deveria ser apenas dos associados, mas tomou outro rumo diferente";
    var frase = Analyser.extrairMorfemas(Analyser.tokenizar(texto)).join(' ');
    var resultado = Analyser.analisarSentimento(frase, stemizarAfinn);

    return {
        texto: frase,
        sentimento: resultado
    };
}

module.exports.getSentimento = getSentimento;