var Analyser = require('./Analyser');

function treinar(full) {
    // Analyser.treinar(false);
    // Analyser.treinar(true);
    Analyser.treinar(!!full);
}

function getSentimento(frases) {
    // var frases = [
    //     'Não consigo efetuar pagamentos',
    //     'Não lê codigo de barras',
    //     'Não achei bom',
    //     'Não consigo transferir',
    //     'pra ficar ruim precisa melhorar muito',
    //     'Poderia ter opção de pagar com PayPal',
    //     'O aplicativo está com cores bem favoráveis',
    //     'O App tá travando toda hora, tem que ver isso aí hein',
    //     'Gostei do aplicativo',
    //     'tá bem bom',
    //     'eu amo, uso sempre',
    //     'Muito boa a nova área de credito',
    //     'antes era ruim, agora tá bom',
    // ];

    var resultados = [];

    frases.forEach(term => {
        resultados.push(
            Analyser.classificar(
                Analyser.extrairMorfemas(
                    Analyser.tokenizar(term))));
    });

    resultados.map(x => {
        x.texto = x.texto.join(' ');
        return x;
    });

    return resultados;
}

module.exports.treinar = treinar;
module.exports.getSentimento = getSentimento;