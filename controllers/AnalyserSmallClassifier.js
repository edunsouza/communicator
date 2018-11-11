var Classifier = require('Smallclassifier');

var Analyser = require('./Analyser');
var TextoSentimento = require('../models/TextoSentimento');

const comentarios = Analyser.getDataSetCompleto();
// const fullDataset = Analyser.getDataSetFull();

var classifier = new Classifier();

function treinar() {
    comentarios.forEach(x => {
        classifier.train(
            Analyser.extrairMorfemas(
                Analyser.tokenizar(
                    Analyser.removerPalavrasVazias(x.texto)
                )
            ).join(' '), x.sentimento
        );
    });
}

function getSentimento(frases) {
    var resultado = [];
    frases.forEach(frase => {
        frase = Analyser.extrairMorfemas(
            Analyser.tokenizar(
                Analyser.removerPalavrasVazias(frase)
            )
        ).join(' ');

        resultado.push(new TextoSentimento(frase, classifier.classify(frase)));
    });
    return resultado;
}

this.treinar = treinar;
this.getSentimento = getSentimento;
module.exports = this;