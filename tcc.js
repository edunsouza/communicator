// var Initializer = require('./app/Initializer');
// Initializer.init();

var afinn = require('./controllers/AnalyserAfinn');
var natural = require('./controllers/AnalyserNatural');
natural.treinar(true);

var start = new Date().getTime();

var feelAfinn = afinn.getSentimento("Sai do itau, em um sistema maravilhoso pra esse sistema pessimo", true);

var feelNatural = natural.getSentimento([
    'Não consigo efetuar pagamentos',
    'Não lê codigo de barras',
    'Não achei bom',
    'Não consigo transferir',
    'pra ficar ruim precisa melhorar muito',
    'Sai do itau, em um sistema maravilhoso pra esse sistema pessimo',
    'Todo bugado, com milhares de informações e poluição visual'
]);

console.log(feelNatural);
console.log("=============================================================");
console.log(feelAfinn);

console.log("tempo de execução: " + (new Date().getTime() - start) / 1000);