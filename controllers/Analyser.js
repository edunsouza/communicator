var natural = require('natural');
var naturalAgressiveTokenizer = new natural.AggressiveTokenizerPt();
var porterStemmerPt = natural.PorterStemmerPt;
var sentimentClassifier = new natural.BayesClassifier(porterStemmerPt);

var dadosKlein = require('../dataset/frases-merge-klein');
var dadosEdu = require('../dataset/frases-full');

function tokenizar(text) {
    return (!text) ? [] : naturalAgressiveTokenizer.tokenize(text.toString());
}

function extrairMorfema(tokens) {
    var morfemas = [];

    if (!tokens) {
        return morfemas
    };

    tokens.forEach(element => {
        var morfema = porterStemmerPt.stem(element);
        if (morfema && morfema.length > 1) {
            morfemas.push(morfema);
        }
    });

    return morfemas;
}

function treinar(evaluations) {
    if (!Array.isArray(evaluations)) {
        return
    };

    evaluations.forEach(element => {
        sentimentClassifier.addDocument(extrairMorfema(tokenizar(element.texto)), element.sentimento);
    });

    sentimentClassifier.train();
}

function classificar(input) {
    return (!input) ? null : {
        texto: input,
        sentimento: sentimentClassifier.classify(input)
    }
}

function init() {

    // treinar(dadosEdu);
    treinar(dadosKlein);
    // treinar(dadosEdu);

    var resultados = [];
    var terms = [
        'Não consigo efetuar pagamentos',
        'Não lê codigo de barras',
        'Não achei bom',
        'Não consigo transferir',
        'pra ficar ruim precisa melhorar muito',
        'Poderia ter opção de pagar com PayPal',
        'O aplicativo está com cores bem favoráveis',
        'App trava',
        'Gostei do aplicativo',
        'tá bem bom',
        'eu amo, uso sempre',
        'Muito boa a nova área de credito',
        'antes era ruim, agora tá bom',
    ];

    terms.forEach(term => {
        var text = tokenizar(term);
        text = extrairMorfema(text);
        resultados.push(classificar(text));
    });

    resultados.map(x => {
        x.texto = x.texto.join(' ');
        return x;
    });

    console.log(resultados);
}

// init();