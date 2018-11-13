const Util = require('../helpers/Util');
const Constantes = require('../helpers/Constantes');
const TextoSentimento = require('../models/TextoSentimento');

const Retriever = require('./Retriever');
const Analyser = require('./Analyser');
const Replier = require('./Replier');
const Publisher = require('./Publisher');

function treinarSistema() {
    var startTime = new Date().getTime();

    // Treinar
    Analyser.treinarComSmallClassifier();
    Analyser.treinarComLimdu();
    Analyser.treinarComNatural();
    Analyser.treinarComAfinn();

    console.log('Bots treinados\n');
    console.log('Tempo de treino: ' + (new Date().getTime() - startTime) / 1000);
}

function classificarTextoComentario(texto) {
    var startTime = new Date().getTime();
    var frases = Util.quebrarFrases(texto);
    var resultados = [];

    // Classificar
    frases.forEach(frase => {
        try {
            resultados.push(
                Number(Analyser.classificarComSmallClassifier(frase).sentimento)
                + Number(Analyser.classificarComLimdu(frase).sentimento)
                + Number(Analyser.classificarComNatural(frase).sentimento)
                + Number(Analyser.classificarComAfinn(frase).sentimento)
            );
        } catch (ex) {
            console.log("<ERRO-CLASSIFICACAO> =============> " + ex.toString());
        }
    });

    resultados = resultados.reduce((pre, pos) => Number(pre) + Number(pos));
    console.log(resultados);
    console.log('tempo de classificação: ' + (new Date().getTime() - startTime) / 1000);

    // console.log("Teste com SmallClassifier: => " + JSON.stringify(resultadoSmallClassifier));
    // console.log("Teste com Limdu: => " + JSON.stringify(resultadoLimdu));
    // console.log("Teste com Natural: => " + JSON.stringify(resultadoNatural));
    // console.log("Teste com Sentiment-ptbr: => " + JSON.stringify(resultadoAfinn));

    return resultados;
}

function buscarPublicacoes() {
    Retriever.getPublicacoes(publicacoes => {
        if (publicacoes) {
            publicacoes.forEach(publicacao => {
                if (Util.buscarCache(Constantes.DB_PATH).filter(pb => pb.id == publicacao.id).length > 0) {
                    return;
                }

                var sentimento = classificarTextoComentario(publicacao.texto);
                var publicacaoComResposta = Replier.getResposta(publicacao, sentimento);
                Publisher.publicar(publicacaoComResposta.resposta, publicacao);
            });
        }
    });
}

this.treinarSistema = treinarSistema;
this.buscarPublicacoes = buscarPublicacoes;
module.exports = this;