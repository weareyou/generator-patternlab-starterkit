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
var jshint = require('gulp-jshint');
var modernizr = require("customizr");






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



/*  Modernizr
\*----------------------------------------------------------------------------*/

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
        "tests": [
            "ambientlight",
            "applicationcache",
            "audio",
            "batteryapi",
            "blobconstructor",
            "canvas",
            "canvastext",
            "contenteditable",
            "contextmenu",
            "cookies",
            "cors",
            "cryptography",
            "customprotocolhandler",
            "customevent",
            "dart",
            "dataview",
            "emoji",
            "eventlistener",
            "exiforientation",
            "flash",
            "forcetouch",
            "fullscreen",
            "gamepads",
            "geolocation",
            "hashchange",
            "hiddenscroll",
            "history",
            "htmlimports",
            "ie8compat",
            "indexeddb",
            "indexeddbblob",
            "input",
            "search",
            "inputtypes",
            "intl",
            "json",
            "ligatures",
            "olreversed",
            "mathml",
            "notification",
            "pagevisibility",
            "performance",
            "pointerevents",
            "pointerlock",
            "postmessage",
            "proximity",
            "queryselector",
            "quotamanagement",
            "requestanimationframe",
            "serviceworker",
            "svg",
            "templatestrings",
            "touchevents",
            "typedarrays",
            "unicoderange",
            "unicode",
            "userdata",
            "vibrate",
            "video",
            "vml",
            "webintents",
            "animation",
            "webgl",
            "websockets",
            "xdomainrequest",
            "adownload",
            "audioloop",
            "audiopreload",
            "webaudio",
            "lowbattery",
            "canvasblending",
            [
                "todataurljpeg",
                "todataurlpng",
                "todataurlwebp"
            ],
            [
                "canvaswinding"
            ],
            "getrandomvalues",
            "cssall",
            "cssanimations",
            "appearance",
            "backdropfilter",
            "backgroundblendmode",
            "backgroundcliptext",
            "bgpositionshorthand",
            "bgpositionxy",
            [
                "bgrepeatspace",
                "bgrepeatround"
            ],
            "backgroundsize",
            "bgsizecover",
            "borderimage",
            "borderradius",
            "boxshadow",
            "boxsizing",
            "csscalc",
            "checked",
            "csschunit",
            "csscolumns",
            "cubicbezierrange",
            "display-runin",
            "displaytable",
            "ellipsis",
            "cssescape",
            "cssexunit",
            "cssfilters",
            "flexbox",
            "flexboxlegacy",
            "flexboxtweener",
            "flexwrap",
            "fontface",
            "generatedcontent",
            "cssgradients",
            "csshairline",
            "hsla",
            [
                "csshyphens",
                "softhyphens",
                "softhyphensfind"
            ],
            "cssinvalid",
            "lastchild",
            "cssmask",
            "mediaqueries",
            "multiplebgs",
            "nthchild",
            "objectfit",
            "opacity",
            "overflowscrolling",
            "csspointerevents",
            "csspositionsticky",
            "csspseudoanimations",
            "csspseudotransitions",
            "cssreflections",
            "regions",
            "cssremunit",
            "cssresize",
            "rgba",
            "cssscrollbar",
            "scrollsnappoints",
            "shapes",
            "siblinggeneral",
            "subpixelfont",
            "supports",
            "target",
            "textalignlast",
            "textshadow",
            "csstransforms",
            "csstransforms3d",
            "preserve3d",
            "csstransitions",
            "userselect",
            "cssvalid",
            "cssvhunit",
            "cssvmaxunit",
            "cssvminunit",
            "cssvwunit",
            "willchange",
            "wrapflow",
            "classlist",
            [
                "createelementattrs",
                "createelement-attrs"
            ],
            "dataset",
            "documentfragment",
            "hidden",
            "microdata",
            "mutationobserver",
            "bdi",
            "datalistelem",
            "details",
            "outputelem",
            "picture",
            [
                "progressbar",
                "meter"
            ],
            "ruby",
            "template",
            "time",
            [
                "texttrackapi",
                "track"
            ],
            "unknownelements",
            "es5array",
            "es5date",
            "es5function",
            "es5object",
            "es5",
            "strictmode",
            "es5string",
            "es5syntax",
            "es5undefined",
            "es6array",
            "es6collections",
            "contains",
            "generators",
            "es6math",
            "es6number",
            "es6object",
            "promises",
            "es6string",
            [
                "devicemotion",
                "deviceorientation"
            ],
            "oninput",
            "filereader",
            "filesystem",
            "capture",
            "fileinput",
            "directory",
            "formattribute",
            "localizednumber",
            "placeholder",
            "requestautocomplete",
            "formvalidation",
            "sandbox",
            "seamless",
            "srcdoc",
            "apng",
            "imgcrossorigin",
            "jpeg2000",
            "jpegxr",
            "sizes",
            "srcset",
            "webpalpha",
            "webpanimation",
            [
                "webplossless",
                "webp-lossless"
            ],
            "webp",
            "inputformaction",
            "inputformenctype",
            "inputformmethod",
            "inputformtarget",
            "beacon",
            "lowbandwidth",
            "eventsource",
            "fetch",
            "xhrresponsetypearraybuffer",
            "xhrresponsetypeblob",
            "xhrresponsetypedocument",
            "xhrresponsetypejson",
            "xhrresponsetypetext",
            "xhrresponsetype",
            "xhr2",
            "scriptasync",
            "scriptdefer",
            "speechrecognition",
            "speechsynthesis",
            "localstorage",
            "sessionstorage",
            "websqldatabase",
            "stylescoped",
            "svgasimg",
            "svgclippaths",
            "svgfilters",
            "svgforeignobject",
            "inlinesvg",
            "smil",
            "textareamaxlength",
            "bloburls",
            "datauri",
            "urlparser",
            "videoautoplay",
            "videoloop",
            "videopreload",
            "webglextensions",
            "datachannel",
            "getusermedia",
            "peerconnection",
            "websocketsbinary",
            [
                "atobbtoa"
            ],
            "framed",
            "matchmedia",
            "blobworkers",
            "dataworkers",
            "sharedworkers",
            "transferables",
            "webworkers"
        ]
    };
    modernizr(modSettings, function () {
        cb();
    });
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



/*  jsHint
\*----------------------------------------------------------------------------*/

gulp.task('jshint', function() {
  return gulp.src([
        config.paths.source.js + '**/*.js',
        '!' + config.paths.source.js + 'lib/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});



/*  Runnable tasks
\*----------------------------------------------------------------------------*/

/**
 * Connect
 */
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
    gulp.watch(config.paths.source.sass + '**/*.scss', ['styles']);

    gulp.watch([
        config.paths.source.js + '**/*.js',
        '!' + config.paths.source.js + 'lib/**/*.js'
    ], ['jshint', 'bs-reload']);

    var patternWatches = [
        config.paths.source.patterns + '**/*.mustache',
        config.paths.source.patterns + '**/*.json',
        config.paths.source.data + '**/*.json',
        '!'+config.paths.source.data + 'data.json',
        config.paths.source.fonts + '**/*',
        config.paths.source.images + '**/*'
    ];

    gulp.watch(patternWatches, ['lab-pipe'], function () { browserSync.reload(); });
});


gulp.task('lab-pipe', ['lab'], function(cb){
    cb();
    browserSync.reload();
});


gulp.task('prelab', ['pl-clean', 'merge-json']);


gulp.task('lab', function(cb){
    runSequence (
        ['prelab'],
        'patternlab',
        cb
    );
});


gulp.task('bs-reload', function(cb){
    cb();
    browserSync.reload();
});


/**
 * Default task
 */
gulp.task('default', function(cb) {
    runSequence (
        ['bower', 'lab', 'copy:styleguide', 'copy:annotations', 'jshint'],
        'styles',
        'modernizr:dev',
        'modernizr:prepare',
        cb
    );
});


/**
 * Serve
 */
gulp.task('serve', function(cb){
    runSequence(
        'default',
        'connect'
    );
});


/**
 * Prepare
 */
gulp.task('prepare', function(cb){
    runSequence(
        'default'
    );
});
