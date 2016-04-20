var config = __config;

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        return gulp.src(
                ['**/*'],
                {
                    cwd: config.paths.source.styleguide
                }
            )
            .pipe(gulp.dest(config.paths.public.styleguide))
        ;
    }
};