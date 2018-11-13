const Natural = require('natural');

const Util = require('../helpers/Util');
const TextoSentimento = require('../models/TextoSentimento');
// datasets
var dataset = Util.getDataSetCompleto();
// var dataset = Util.getDataSetAfinn();
const classificador = new Natural.BayesClassifier(Natural.PorterStemmerPt);

function treinar() {
    Util.embaralhar(dataset).forEach(x => {
        classificador.addDocument(Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(x.texto))), x.sentimento);
    });

    classificador.train();
}

function classificar(frase) {
    return new TextoSentimento(
        frase,
        classificador.classify(Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(frase))) || '')
    );
}

this.treinar = treinar;
this.classificar = classificar;
module.exports = this;