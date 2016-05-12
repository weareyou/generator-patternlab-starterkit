/**
 * Define globals
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
var jshint = require('gulp-jshint');
var modernizr = require("customizr");
var stylelint = require('stylelint');
var syntaxScss = require("postcss-scss");
var chalk = require("chalk");
var notify = require("gulp-notify");


var handleError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.'
    }).write(error);

    // Inspect the error object
    //console.log(error);

    // Easy error reporting
    //console.log(error.toString());

    // Pretty error reporting
    var report = '';

    report += chalk.white.bgRed('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk.white.bgRed('ERROR:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk.red('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk.red('FILE:') + ' ' + error.fileName + '\n'; }

    console.error(report);

    // Prevent the 'watch' task from stopping
    this.emit('end');
}





/*----------------------------------------------------------------------------*\
    Tasks
\*----------------------------------------------------------------------------*/

/*  Copy
\*----------------------------------------------------------------------------*/

/**
 * Task: copy:styleguide
 * Copies the patternlab styleguide to the public folder
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
 * Task: copy:annotations
 * Copies the annotations file to the public data folder
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
<% if (!sameFolder) { %>

/**
 * Task: copy:js
 * Copies the javascript files to the public folder
 */
gulp.task('copy:js', function(cb){
    return gulp.src(
            '**/*.js',
            {
                cwd: config.paths.source.js
            }
        )
        .pipe(gulp.dest(config.paths.public.js))
    ;
    cb();
});


/**
 * Task: copy:images
 * Copies the image files to the public folder
 */
gulp.task('copy:images', function(cb){
    return gulp.src(
            '**/*',
            {
                cwd: config.paths.source.images
            }
        )
        .pipe(gulp.dest(config.paths.public.images))
    ;
    cb();
});


/**
 * Task: copy:fonts
 * Copies the font files to the public folder
 */
gulp.task('copy:fonts', function(cb){
    return gulp.src(
            '**/*',
            {
                cwd: config.paths.source.fonts
            }
        )
        .pipe(gulp.dest(config.paths.public.fonts))
    ;
    cb();
});


/**
 * Task: copy:bower
 * Copies the bower files to the public folder
 */
gulp.task('copy:bower', function(cb){
    return gulp.src(
            '**/*',
            {
                cwd: config.paths.source.bower
            }
        )
        .pipe(gulp.dest(config.paths.public.bower))
    ;
    cb();
});
<% } %>



/*  Clean
\*----------------------------------------------------------------------------*/

/**
 * Task: clean:pl
 * Cleans up the public pattern folder so there will be no remnants of the
 * previous build
 */
gulp.task('clean:pl', function(cb){
    del.sync([config.paths.public.patterns + '*'], {force: true});
    cb();
});
<% if (!sameFolder) { %>


/**
 * Task: clean:js
 * Cleans the public javascript folder
 */
gulp.task('clean:js', function(cb){
    del([
        config.paths.public.js + '*',
        '!' + config.paths.public.js + 'lib',
        '!' + config.paths.public.js + 'lib/modernizr.development.js',
        '!' + config.paths.public.js + 'lib/modernizr.build.js'
    ], {force: true});
    cb();
});


/**
 * Task: clean:images
 * Cleans the public images folder
 */
gulp.task('clean:images', function(cb){
    del.sync([
        config.paths.public.images + '*'
    ], {force: true});
    cb();
});


/**
 * Task: clean:fonts
 * Cleans the public fonts folder
 */
gulp.task('clean:fonts', function(cb){
    del.sync([
        config.paths.public.fonts + '*'
    ], {force: true});
    cb();
});


/**
 * Task: clean:bower
 * Cleans the public bower folder
 */
gulp.task('clean:bower', function(cb){
    del.sync([
        config.paths.public.bower + '*'
    ], {force: true});
    cb();
});
<% } %>



/*  Task: bower
    Makes sure the bower components are cleaned and installed.
\*----------------------------------------------------------------------------*/

gulp.task('bower', function(cb){
    return gulp.src('')
        .pipe(shell([
            'bower prune',
            'bower install'
        ]))
    ;
});

gulp.task('bower-pipe', ['bower:sequence'], function(cb){
    cb();
    browserSync.reload();
});

gulp.task('bower:sequence', function(cb){
    runSequence (
        [<% if (!sameFolder) { %>'clean:bower', <% } %>'bower'],
        <% if (!sameFolder) { %>'copy:bower',<% } %>
        cb
    );
});



/*  Modernizr
    While developing we use ALL the tests. When we prepare for deployments
    we scan css & javascript files for actual tests so we have the cleanest
    modernizr file possible.
\*----------------------------------------------------------------------------*/

/**
 * Task: modernizr:dev
 * Creates a development version with ALL the tests included.
 */
gulp.task('modernizr:dev', function(cb) {
    var modSettings = {
        // Empty, because this task is generating the dev build
        "devFile" : false,

        // Path to save out the built file.
        "dest" : config.paths.public.js + "lib/modernizr.development.js",

        "classPrefix": config.modernizrCssPrefix,
        "cssprefix": config.modernizrCssPrefix,

        "crawl": false,

        "options": [
            "addTest",
            "testProp",
            "setClasses",
            "prefixed",
            "mq"
        ],

        // All tests, add some if modernizr supports them
        "tests": config.modernizrAllTests
    };
    modernizr(modSettings, function () {
        cb();
    });
});


/**
 * Task: modernizr:prepare
 * Scans the css & js files for actual used tests.
 */
gulp.task('modernizr:prepare', function(cb) {
    var modSettings = {
        // Path to the build you're using for development.
        "devFile" : config.paths.public.js + "lib/modernizr.development.js",

        // Path to save out the built file.
        "dest" : config.paths.public.js + "lib/modernizr.build.js",

        "classPrefix": config.modernizrCssPrefix,
        "cssprefix": config.modernizrCssPrefix,

        "options": [
            "addTest",
            "testProp",
            "setClasses",
            "prefixed",
            "mq"
        ],

        // When crawl = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        "files" : {
            "src": [
                config.paths.public.js + "**/*.js",
                "!" + config.paths.public.js + "lib/modernizr.*.js",
                config.paths.public.css + "**/*.css"
            ]
        }
    };
    modernizr(modSettings, function () {
        cb();
    });
});



/*  Task: styles
    Tests for markup errors, compiles and autoprefixes the `scss` files
\*----------------------------------------------------------------------------*/

gulp.task('styles', function(cb){
    return gulp.src(config.paths.source.sass + '**/*.scss')
        .pipe(postcss([
            stylelint()
        ], {
            syntax: syntaxScss
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                config.paths.source.bower
            ]
        }).on('error', handleError))
        .pipe(postcss([
            autoprefixer({
                browsers: config.browserlist
            })
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.public.css))
        .pipe(browserSync.stream({match: '**/*.css'}))
    ;
});



/*  Task: jshint
    Checks our own javascript files for potential errors.
\*----------------------------------------------------------------------------*/

gulp.task('jshint', function() {
  return gulp.src([
        config.paths.source.js + '**/*.js',
        '!' + config.paths.source.js + 'lib/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});



/*  Task: connect
    Fires up a development server using browserSync
\*----------------------------------------------------------------------------*/

gulp.task('connect', function() {
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
});



/*  Task: watch
    Setup files watches to track changes/additions/deletions of files and take
    action upon those changes
\*----------------------------------------------------------------------------*/

gulp.task('watch', function() {
    /**
     * Styles
     */
    var stylesWatcher = gulp.watch(config.paths.source.sass + '**/*.scss', ['styles']);
    stylesWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });


    /**
     * Javascripts
     */
    var scriptsWatcher = gulp.watch([
        config.paths.source.js + '**/*.js',
        '!' + config.paths.source.js + 'lib/**/*.js'
    ], [
        'jshint',<% if (!sameFolder) { %>
        'clean:js',
        'copy:js',<% } %>
        'bs-reload'
    ]);
    scriptsWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });


    /**
     * Images
     */
    var imagesWatcher = gulp.watch([
        config.paths.source.images + '**/*'
    ], [
        <% if (!sameFolder) { %>'clean:images',
        'copy:images',<% } %>
        'bs-reload'
    ]);
    imagesWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });


    /**
     * Fonts
     */
    var fontsWatcher = gulp.watch([
        config.paths.source.fonts + '**/*'
    ], [
        <% if (!sameFolder) { %>'clean:fonts',
        'copy:fonts',<% } %>
        'bs-reload'
    ]);
    fontsWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });


    /**
     * Bower
     */
    var bowerWatcher = gulp.watch([
        'bower.json'
    ], [
        'bower-pipe'
    ]);
    bowerWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });


    var patternWatches = [
        config.paths.source.patterns + '**/*.mustache',
        config.paths.source.patterns + '**/*.json',
        config.paths.source.data + '**/*.json',
        config.paths.source.data + '**/*.js',
        '!'+config.paths.source.data + 'data.json',
        config.paths.source.fonts + '**/*',
        config.paths.source.images + '**/*'
    ];

    var patternWatcher = gulp.watch(patternWatches, ['lab-pipe'], function () { browserSync.reload(); });
    patternWatcher.on('change', function(event){
        console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
    });
});



/*  Patternlab specific tasks
\*----------------------------------------------------------------------------*/

/**
 * Task: merge-json
 * Merges our separate json files into the `data.json` file patternlab needs to
 * operate.
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
 * Task: patternlab
 * Builds the patternlab styleguide
 */
gulp.task('patternlab', function(cb){
    pl.build(true);
    cb();
});


/**
 * Task: lab-pipe
 * A small wrapper task to pipe patternlab specific stuff after eachother and
 * then reload the browserSync frame
 */
gulp.task('lab-pipe', ['lab'], function(cb){
    cb();
    browserSync.reload();
});


/**
 * Task: prelab
 * Prepare stuff before patternlab builds
 */
gulp.task('prelab', [
    'clean:pl',
    'merge-json'
]);


/**
 * Task: lab
 * Sequence the prelab and patternlab functions
 */
gulp.task('lab', function(cb){
    runSequence (
        ['prelab', 'copy:annotations'],
        'patternlab',
        cb
    );
});



/*  Task: bs-reload
    A task to reload browserSync from other tasks
\*----------------------------------------------------------------------------*/

gulp.task('bs-reload', function(cb){
    cb();
    browserSync.reload();
});





/*----------------------------------------------------------------------------*\
    External tasks
    Tasks wich will be used from the command line. These tasks chain together
    all other tasks mentioned in this file.
\*----------------------------------------------------------------------------*/

/**
 * task: default
 * Prepares the code one time
 */
gulp.task('default', function(cb) {
    runSequence (
        <% if (!sameFolder) { %>['clean:js', 'clean:images', 'clean:fonts', 'clean:bower'],<% } %>
        ['bower', 'lab', 'copy:styleguide', 'copy:annotations', 'jshint'],
        'styles',
        <% if (!sameFolder) { %>['copy:js', 'copy:images', 'copy:fonts', 'copy:bower'],<% } %>
        'modernizr:dev',
        'modernizr:prepare',
        cb
    );
});


/**
 * task: serve
 * Prepares the code, fires up a development server and sets up watch tasks
 */
gulp.task('serve', function(cb){
    runSequence(
        'default',
        'watch',
        'connect'
    );
});


/**
 * task: prepare
 * Similar to `default` but used for deployments
 */
gulp.task('prepare', function(cb){
    runSequence(
        'default'
    );
});
