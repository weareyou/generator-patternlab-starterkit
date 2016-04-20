/**
 * Define a globals
 */
global.__base = __dirname + '/';
global.__config = config = require('./config.json');


/**
 * Require needed modules
 */
var gulp = require('gulp');
var gulpRequireTasks = require('gulp-require-tasks');
var runSequence = require('run-sequence');
var merge = require('gulp-merge-json');
var shell = require('gulp-shell');
var pl = require('patternlab-node')(config);
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


/*----------------------------------------------------------------------------*\
    Tasks
\*----------------------------------------------------------------------------*/

/*  Patternlab
\*----------------------------------------------------------------------------*/

/**
 * Merge json
 */
gulp.task('merge-json', function(cb){
    return gulp.src([
            config.paths.source.data + '**/*.json',
            '!' + config.paths.source.data + 'data.json',
            '!' + config.paths.source.data + 'listitems.json'
        ])
        .pipe(merge('data.json'))
        .pipe(gulp.dest(config.paths.source.data))
    ;
});


/**
 * Patternlab
 */
gulp.task('patternlab', function(cb){
    pl.build(true);
    cb();
});

/**
 * Copy: styleguide
 */
gulp.task('copy:styleguide', function(cb){
    return gulp.src(
            ['**/*'],
            {
                cwd: config.paths.source.styleguide
            }
        )
        .pipe(gulp.dest(config.paths.public.styleguide))
    ;
});

/**
 * Copy: annotations
 */
gulp.task('copy:annotations', function(cb){
    return gulp.src(
            'annotations.js',
            {
                cwd: config.paths.source.data
            }
        )
        .pipe(gulp.dest(config.paths.public.data))
    ;
});



/*  Bower
\*----------------------------------------------------------------------------*/

gulp.task('bower', function(cb){
    return gulp.src('')
        .pipe(shell([
            'bower prune',
            'bower install'
        ]))
    ;
});




/*  Styles
\*----------------------------------------------------------------------------*/

gulp.task('styles', function(cb){
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
});



/*  Runnable tasks
\*----------------------------------------------------------------------------*/

gulp.task('default', function(cb) {
    runSequence (
        ['merge-json'],
        ['bower'],
        ['copy:styleguide'],
        ['copy:annotations'],
        ['patternlab'],
        ['styles']
    );
});
