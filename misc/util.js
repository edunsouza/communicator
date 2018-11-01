var Path = require('path');

this.fromRoot = function(dir) {
    return Path.join(Path.dirname(require.main.filename) + dir);
};

module.export = this;