/**
 * Define a globals
 */
global.__base = __dirname + '/';
global.__config = config = require('./config.json');


/**
 * Require needed modules
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var merge = require('gulp-merge-json');
var shell = require('gulp-shell');
var pl = require('patternlab-node')(config);
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = del = require('del');


/*----------------------------------------------------------------------------*\
    Tasks
\*----------------------------------------------------------------------------*/

/*  Patternlab
\*----------------------------------------------------------------------------*/

/**
 * Clean patterns dir
 */
gulp.task('pl-clean', function(cb){
    del.sync([config.paths.public.patterns + '*'], {force: true});
    cb();
});

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
        .pipe(browserSync.stream({match: '**/*.css'}))
    ;
});



/*  Runnable tasks
\*----------------------------------------------------------------------------*/

/**
 * Connect
 */
gulp.task('connect', ['lab'], function() {
    browserSync.init({
        server: {
            baseDir: config.paths.public.root
        },
        snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
        },
        notify: {
            styles: [
                'display: none',
                'padding: 15px',
                'font-family: sans-serif',
                'position: fixed',
                'font-size: 1em',
                'z-index: 9999',
                'bottom: 0px',
                'right: 0px',
                'border-top-left-radius: 5px',
                'background-color: #1B2032',
                'opacity: 0.4',
                'margin: 0',
                'color: white',
                'text-align: center'
            ]
        }
    });
    gulp.watch(config.paths.source.sass + '**/*.scss', ['styles']);

    // gulp.watch(config.paths.source.styleguide, '**/*.*', ['pl-copy:styleguide']);

    var patternWatches = [
        config.paths.source.patterns + '**/*.mustache',
        config.paths.source.patterns + '**/*.json',
        config.paths.source.data + '**/*.json',
        config.paths.source.fonts + '**/*',
        config.paths.source.images + '**/*'
    ];

    gulp.watch(patternWatches, ['lab-pipe'], function () { browserSync.reload(); });
});

gulp.task('lab-pipe', ['lab'], function(cb){
    cb();
    browserSync.reload();
});

gulp.task('prelab', ['pl-clean'/*, 'assets'*/]);
gulp.task('lab', ['prelab', 'patternlab'], function(cb){cb();});


/**
 * Default task
 */
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
