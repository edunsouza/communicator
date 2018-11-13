const Sentiment = require('sentiment-ptbr');

const Util = require('../helpers/Util');
const TextoSentimento = require('../models/TextoSentimento');
// datasets
var dataset = Util.getDataSetAfinnObject();
var afinnStemizado = null;

function treinar() {
    if (afinnStemizado === null) {
        var stemizado = {};
        Object.keys(dataset).forEach(palavra => {
            stemizado[Util.getMorfema(palavra)] = dataset[palavra];
        });
        afinnStemizado = Util.embaralhar(stemizado);
    }
}

function classificar(frase) {
    return new TextoSentimento(
        frase,
        Sentiment(Util.extrairMorfemas(Util.tokenizar(Util.removerPalavrasVazias(frase))).join(' '), afinnStemizado).comparative
    );
}

this.treinar = treinar;
this.classificar = classificar;
module.exports = this;