var config = __config;
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        var processors = [
            autoprefixer({browsers: config.browserlist})
        ];
        return gulp.src(config.paths.source.sass + '**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [
                    config.paths.source.bower
                ]
            }).on('error', sass.logError))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.public.css))
        ;
    }
};