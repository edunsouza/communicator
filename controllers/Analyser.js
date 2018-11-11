var Natural = require('natural');
var Sentiment = require('sentiment-ptbr');
var StopWord = require('stopword');
const STOPWORDS_BR = require('../dataset/dados/stopwords-br');

var Util = require('../helpers/Util');

const parcial = require('../dataset/comentarios/parcial-json');
const comentarios = require('../dataset/comentarios/completo-json');
const datasetFull = require('../dataset/dados/dataset');
const afinnArray = require("../dataset/afinn/afinn");
const afinnObj = require("../dataset/afinn/afinn-obj");

var tokenizador = new Natural.AggressiveTokenizerPt();
var stemizador = Natural.PorterStemmerPt;
var classificador = new Natural.BayesClassifier(stemizador);

function tokenizar(texto) {
    return (!texto) ? [] : tokenizador.tokenize(texto.toString());
}

function extrairMorfemas(tokens) {
    var morfemas = [];

    if (!tokens) {
        return morfemas;
    }

    tokens.forEach(tkn => {
        var morfema = stemizador.stem(tkn);
        if (morfema && morfema.length > 1) {
            morfemas.push(morfema);
        }
    });

    return morfemas;
}

function getMorfema(palavra) {
    var morfema = stemizador.stem(palavra);
    return (morfema.length > 1) ? morfema : palavra;
}

function removerPalavrasVazias(frase) {
    return StopWord.removeStopwords(frase.split(' '), STOPWORDS_BR).join(' ');
}

function treinar() {
    var publicacoes = Util.embaralhar(comentarios);

    publicacoes.forEach(avaliacao => {
        classificador.addDocument(extrairMorfemas(tokenizar(removerPalavrasVazias(avaliacao.texto))), avaliacao.sentimento);
    });

    classificador.train();
}

function classificar(input) {
    return classificador.classify(input || "");
}

function analisarSentimento(frase) {
    return Sentiment(frase, getAfinnObjStemizado());
    // return Sentiment(frase, afinnObj);
}

function getAfinnObjStemizado() {
    var stemizado = {};
    var keys = Object.keys(afinnObj);
    keys.forEach(palavra => {
        stemizado[stemizador.stem(palavra)] = afinnObj[palavra];
    });
    return stemizado;
}

function getDataSetParcial() { return parcial; }

function getDataSetCompleto() { return comentarios; }

function getDataSetFull() { return datasetFull; }

function getDataSetAfinn() { return afinnArray; }

function getDataSetAfinnObject() { return afinnObj; }

// Acesso público
this.tokenizar = tokenizar;
this.extrairMorfemas = extrairMorfemas;
this.getMorfema = getMorfema;
this.treinar = treinar;
this.classificar = classificar;
this.analisarSentimento = analisarSentimento;
this.removerPalavrasVazias = removerPalavrasVazias;
// Datasets
this.getDataSetParcial = getDataSetParcial;
this.getDataSetCompleto = getDataSetCompleto;
this.getDataSetFull = getDataSetFull;
this.getDataSetAfinn = getDataSetAfinn;
this.getDataSetAfinnObject = getDataSetAfinnObject;
module.exports = this;