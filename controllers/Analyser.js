const Util = require('../helpers/Util');

const SmallClassifier = require('./AnalyserSmallClassifier');
const Limdu = require('./AnalyserLimdu');
const Natural = require('./AnalyserNatural');
const Afinn = require('./AnalyserAfinn');

// Interface de análise
function classificarComSmallClassifier(texto) {
    return SmallClassifier.classificar(texto);
}

function classificarComLimdu(texto) {
    return Limdu.classificar(texto);
}

function classificarComNatural(texto) {
    return Natural.classificar(texto);
}

function classificarComAfinn(texto) {
    return Afinn.classificar(texto);
}

// Analisadores
this.treinarComSmallClassifier = SmallClassifier.treinar;
this.classificarComSmallClassifier = classificarComSmallClassifier;

this.treinarComLimdu = Limdu.treinar;
this.classificarComLimdu = classificarComLimdu;

this.treinarComNatural = Natural.treinar;
this.classificarComNatural = classificarComNatural;

this.treinarComAfinn = Afinn.treinar;
this.classificarComAfinn = classificarComAfinn;
module.exports = this;