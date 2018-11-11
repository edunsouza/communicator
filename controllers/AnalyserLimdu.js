var limdu = require('limdu');

var Analyser = require('../controllers/Analyser');
var InputOutput = require('../models/InputOutput');
var TextoSentimento = require('../models/TextoSentimento');
const comentarios = Analyser.getDataSetCompleto();

var intentClassifier = new limdu.classifiers.EnhancedClassifier({
    normalizer: limdu.features.LowerCaseNormalizer,
    classifierType: limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
    }),
    featureExtractor: function (input, features) {
        input.split(' ').forEach(function (word) {
            features[word] = 1;
        });
    }
});

function treinar() {
    var massaTeste = [];
    // parse dataset para formato aceito pelo Limdu
    comentarios.forEach(x => {
        var texto = Analyser.extrairMorfemas(
            Analyser.tokenizar(
                Analyser.removerPalavrasVazias(x.texto)
            )
        ).join(' ');
        massaTeste.push(new InputOutput(texto, x.sentimento));
    });
    intentClassifier.trainBatch(massaTeste);
}

function getSentimento(frases) {
    var resultado = [];

    frases.forEach(frase => {
        var arr = intentClassifier.classify(frase);
        arr = !arr.length ? [0] : arr.map(x => Number(x) || 0);
        resultado.push(new TextoSentimento(frase, arr.reduce((x,y) => x+y)));
    });

    return resultado;
}

// result = result.join().split(',').map(x => Number(x)).reduce((x, y) => x + y);
this.treinar = treinar;
this.getSentimento = getSentimento;
module.exports = this;