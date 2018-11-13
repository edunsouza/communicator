const path = require('path');
const fs = require('fs');
const StopWord = require('stopword');
const Natural = require('natural');
// Analisadores
const STOPWORDS_BR = require('../dataset/dados/stopwords-br');
const tokenizador = new Natural.AggressiveTokenizerPt();
const stemizador = Natural.PorterStemmerPt;
// Datasets
const parcial = require('../dataset/comentarios/parcial-json');
const completo = require('../dataset/comentarios/completo-json');
const dataset = require('../dataset/dados/dataset');
const afinn = require("../dataset/afinn/afinn");
const afinnObj = require("../dataset/afinn/afinn-obj");

function fromRoot(dir) {
    return path.join(path.dirname(require.main.filename) + dir);
}

function quebrarFrases(string) {
    var pt = "[\\.\\\\?\\!]+";
    var ou = "|";
    var spc = "\\s";
    var fim = "$";
    var linha = "\\n";
    var spcOuTab = "\\s+|\\t+";
    var global = 'g';
    return string
        .split(
            new RegExp(
                pt + spc + pt + ou +
                spc + pt + ou +
                pt + spc + ou +
                pt + fim + ou +
                linha, global)
        )
        .map(x => x.trim())
        .filter(Boolean)
        .map(x => x.replace(new RegExp(spcOuTab, global), " "));
}

function embaralhar(array) {
    for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}

// Analisadores
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

// Banco
function salvarCache(registro, dbPath) {
    var cache = JSON.parse(fs.readFileSync(dbPath));
    var encontrou = false;
    
    for (var i = 0; i < cache.length; i++) {

        if (cache[i].id == registro.id) {
            cache[i] = registro;
            encontrou = true;
            break;
        }

        if (i == cache.length-1 && !encontrou) {
            cache.push(registro);
            break;
        }
    }

    if (!cache.length) cache.push(registro);

    fs.writeFileSync(dbPath, JSON.stringify(cache, null, '\t'));
}

function buscarCache(dbPath) {
    return JSON.parse(fs.readFileSync(dbPath));
}

// Datasets
function getDataSetParcial() {
    return parcial;
}

function getDataSetCompleto() {
    // return completo;
    return [{texto: "asdasd", sentimento: 123},{texto: "asdasd", sentimento: 123}];
}

function getDataSetFull() {
    return dataset;
}

function getDataSetAfinn() {
    return afinn;
}

function getDataSetAfinnObject() {
    // return afinnObj;
    return [{texto: "asdasd", sentimento: 123},{texto: "asdasd", sentimento: 123}];
}

this.fromRoot = fromRoot;
this.quebrarFrases = quebrarFrases;
this.embaralhar = embaralhar;
// Analisadores
this.tokenizar = tokenizar;
this.extrairMorfemas = extrairMorfemas;
this.getMorfema = getMorfema;
this.removerPalavrasVazias = removerPalavrasVazias;
// Banco
this.salvarCache = salvarCache;
this.buscarCache = buscarCache;
// Datasets
this.getDataSetParcial = getDataSetParcial;
this.getDataSetCompleto = getDataSetCompleto;
this.getDataSetFull = getDataSetFull;
this.getDataSetAfinn = getDataSetAfinn;
this.getDataSetAfinnObject = getDataSetAfinnObject;
module.export = this;