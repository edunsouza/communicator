const SmallClassifier = require('smallclassifier');

const Util = require('../helpers/Util');
const TextoSentimento = require('../models/TextoSentimento');
// datasets
var dataset = Util.getDataSetCompleto();
// var dataset = Util.getDataSetAfinn();
const classificador = new SmallClassifier();

function treinar() {
    Util.embaralhar(dataset).forEach(x => {
        classificador.train(Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(x.texto))).join(' '), x.sentimento);
    });
}

function classificar(frase) {
    return new TextoSentimento(
        frase,
        classificador.classify(Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(frase))).join(' '))
    );
}

this.treinar = treinar;
this.classificar = classificar;
module.exports = this;