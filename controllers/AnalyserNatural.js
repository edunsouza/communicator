var Analyser = require('./Analyser');

var TextoSentimento = require('../models/TextoSentimento');

function treinar() {
    Analyser.treinar();
}

function getSentimento(frases) {
    var resultados = [];

    frases.forEach(frase => {
        resultados.push(new TextoSentimento(frase,
            Analyser.classificar(
                Analyser.extrairMorfemas(
                    Analyser.tokenizar(
                        Analyser.removerPalavrasVazias(frase)
                    )
                )
            )
        ));
    });
    return resultados;
}

this.treinar = treinar;
this.getSentimento = getSentimento;
module.exports = this;