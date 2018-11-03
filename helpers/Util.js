var path = require('path');

this.fromRoot = function (dir) {
    return path.join(path.dirname(require.main.filename) + dir);
};

this.quebrarFrases = function (string) {
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
};

module.export = this;