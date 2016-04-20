var config = __config;
var merge = require('gulp-merge-json');

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        return gulp.src([
                config.paths.source.data + '**/*.json',
                '!' + config.paths.source.data + 'data.json',
                '!' + config.paths.source.data + 'listitems.json'
            ])
            .pipe(merge('data.json'))
            .pipe(gulp.dest(config.paths.source.data))
        ;
    }
};