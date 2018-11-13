const Limdu = require('limdu');

const Util = require('../helpers/Util');
const TextoSentimento = require('../models/TextoSentimento');
const InputOutput = require('../models/InputOutput');
// datasets
var dataset = Util.getDataSetCompleto();
// var dataset = Util.getDataSetAfinn();
const classificador = new Limdu.classifiers.EnhancedClassifier({
    normalizer: Limdu.features.LowerCaseNormalizer,
    classifierType: Limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: Limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
    }),
    featureExtractor: function (input, features) {
        input.split(' ').forEach(function (word) {
            features[word] = 1;
        });
    }
});

function treinar() {
    var massaTeste = [];
    Util.embaralhar(dataset).forEach(x => {
        massaTeste.push(new InputOutput(
            Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(x.texto))).join(' '),
            x.sentimento
        ));
    });

    classificador.trainBatch(massaTeste);
}

function classificar(frase) {
    var arr = classificador.classify(frase);
    arr = !arr.length ? [0] : arr.map(x => Number(x) || 0);
    return new TextoSentimento(frase, arr.reduce((x,y) => x+y));
}

this.treinar = treinar;
this.classificar = classificar;
module.exports = this;