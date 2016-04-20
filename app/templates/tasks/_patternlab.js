var config = __config;
var pl = require('patternlab-node')(config);

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        pl.build(true);
        callback();
    }
};