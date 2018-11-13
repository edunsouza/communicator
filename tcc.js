// var Initializer = require('./app/Initializer');
// Initializer.init();

var Analyser = require('./controllers/Analyser');
var Publisher = require('./controllers/Publisher');
var Replier = require('./controllers/Replier');
var Retriever = require('./controllers/Retriever');

var start = new Date().getTime();
Analyser.treinarComSmallClassifier();
Analyser.treinarComLimdu();
Analyser.treinarComNatural();
Analyser.treinarComAfinn();

console.log("tempo de treino: " + (new Date().getTime() - start) / 1000);
start = new Date().getTime();

var frase = "o primeiro teste foi todo bugado!";

var resultadoSmallClassifier = Analyser.classificarComSmallClassifier(frase);
var resultadoLimdu = Analyser.classificarComLimdu(frase);
var resultadoNatural = Analyser.classificarComNatural(frase);
var resultadoAfinn = Analyser.classificarComAfinn(frase);

var rs = Number(resultadoSmallClassifier.sentimento)
+ Number(resultadoLimdu.sentimento)
+ Number(resultadoNatural.sentimento)
+ Number(resultadoAfinn.sentimento);

console.log(rs);

console.log("Teste com SmallClassifier: => " + JSON.stringify(resultadoSmallClassifier));
console.log("Teste com Limdu: => " + JSON.stringify(resultadoLimdu));
console.log("Teste com Natural: => " + JSON.stringify(resultadoNatural));
console.log("Teste com Sentiment-ptbr: => " + JSON.stringify(resultadoAfinn));

console.log("tempo de execução: " + (new Date().getTime() - start) / 1000);

// var afinn = require('./controllers/AnalyserAfinn');
// var natural = require('./controllers/AnalyserNatural');
// var limdu = require('./controllers/AnalyserLimdu');
// var small = require('./controllers/AnalyserSmallClassifier');
// var start = new Date().getTime();

// var massaTeste = [
//     'Não consegui fazer cartão de crédito to mais 6 mês esperando nome limpou nunca é aprovado',
//     'Como é que dá um fim de semana e eu não posso transferir meu dinheiro pra outra conta',
//     'Palhaçada isso',
//     'Repito: palhaçada',
//     'Se eu precisar do meu dinheiro, vou ficar sem',
//     'Meu dinheiro tá preso lá',
//     'É meu e eu não posso usar',
//     'Não achei bom',
//     'Não consigo transferir',
//     'pra ficar ruim precisa melhorar muito',
//     'Sai do itau, em um sistema maravilhoso pra esse sistema pessimo',
//     'Todo bugado, com milhares de informações e poluição visual',
//     'Sem mensalidade e anuidade, um cartão único que cumpre o prometido',
//     'Começou a revolução digital em nosso país,obrigado por estar ao lado dos consumidores e fazendo clientes felizes'
// ];

// natural.treinar();
// natural.treinar();
// limdu.treinar();
// limdu.treinar();
// small.treinar();
// small.treinar();

// console.log("tempo de treino: " + (new Date().getTime() - start) / 1000);
// start = new Date().getTime();

// var feelNatural = natural.getSentimento(massaTeste);
// var feelLimdu = limdu.getSentimento(massaTeste);
// var feelAfinn = afinn.getSentimento(massaTeste);
// var feelSmall = small.getSentimento(massaTeste);

// console.log(feelNatural);
// console.log("=============================================================");
// console.log(feelLimdu);
// console.log("=============================================================");
// console.log(feelSmall);
// console.log("=============================================================");
// console.log(feelAfinn);

// console.log("tempo de execução: " + (new Date().getTime() - start) / 1000);