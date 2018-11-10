var natural = require('natural');
var sentiment = require('sentiment-ptbr');

var comentariosCompletos = require('../dataset/comentarios/completo-json');
var comentariosParciais = require('../dataset/comentarios/parcial-json');
var afinn = require("../dataset/afinn/afinn-obj");

var tokenizador = new natural.AggressiveTokenizerPt();
var stemizador = natural.PorterStemmerPt;
var classificador = new natural.BayesClassifier(stemizador);

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

function treinar(massaCompleta) {
    var publicacoes = massaCompleta ? comentariosCompletos : comentariosParciais;

    publicacoes.forEach(avaliacao => {
        classificador
            .addDocument(
                extrairMorfemas(
                    tokenizar(avaliacao.texto)), avaliacao.sentimento);
    });

    classificador.train();
}

function classificar(input) {
    return {
        sentimento: classificador.classify(input || ""),
        texto: input
    };
}

function analisarSentimento(frase, stemizarAfinn) {
    var lista = (stemizarAfinn) ? getAfinnStemizado(): afinn;
    return sentiment(frase, lista);
}

function getAfinnStemizado() {
    var stemizado = {};
    var keys = Object.keys(afinn);
    keys.forEach(palavra => {
        stemizado[stemizador.stem(palavra)] = afinn[palavra];
    });
    return stemizado;
}

// Acesso público
this.tokenizar = tokenizar;
this.extrairMorfemas = extrairMorfemas;
this.getMorfema = getMorfema;
this.treinar = treinar;
this.classificar = classificar;
this.analisarSentimento = analisarSentimento;
module.exports = this;