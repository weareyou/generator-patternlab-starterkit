var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var config = __config;

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        return gulp.src(config.paths.source.sass + '**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [
                    config.paths.source.bower
                ]
            }).on('error', sass.logError))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.public.css))
        ;
    }
};