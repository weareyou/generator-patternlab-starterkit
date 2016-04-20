var config = __config;

module.exports = {
    dep: [],
    fn: function (gulp, callback) {
        return gulp.src(
                'annotations.js',
                {
                    cwd: config.paths.source.data
                }
            )
            .pipe(gulp.dest(config.paths.public.data))
        ;
    }
};