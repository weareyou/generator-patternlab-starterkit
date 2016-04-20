var config = __config;
var shell = require('gulp-shell');

module.exports = {
    dep: [],
    fn: function (gulp, callback) {

        return gulp.src('')
            .pipe(shell([
                'bower prune',
                'bower install'
            ]))
        ;
    }
};