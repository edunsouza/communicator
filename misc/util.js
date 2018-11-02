var path = require('path');

this.fromRoot = function(dir) {
    return path.join(path.dirname(require.main.filename) + dir);
};

module.export = this;