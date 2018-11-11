var Analyser = require('./Analyser');

var TextoSentimento = require('../models/TextoSentimento');

function getSentimento(frases) {
    var resultado = [];

    frases.forEach(frase => {
        resultado.push(new TextoSentimento(frase,
            Analyser.analisarSentimento(
                Analyser.extrairMorfemas(
                    Analyser.tokenizar(
                        Analyser.removerPalavrasVazias(frase)
                    )
                ).join(' ')
            ).words
        ));
    });

    return resultado;
}

module.exports.getSentimento = getSentimento;