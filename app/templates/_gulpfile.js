/**
 * Define globals
 */
global.__base = __dirname + '/';
global.__config = config = require('./config.json');
var packageConfig = require('./package.json');


/**
 * Require needed modules
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var del = require('del');
var pl = require('patternlab-node')(config);
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var stylelint = require('gulp-stylelint');
var chalk = require("chalk");
var notify = require("gulp-notify");
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var es = require('event-stream');

function paths() {
  return config.paths;
}


var handleError = function (error) {
  var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + 'See console.'
  }, notify.logLevel(0)).write(error);

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
gulp.task('copy:styleguide', function(){
  return gulp.src(path.resolve(paths().source.styleguide, '**/!(*.css)'))
    .pipe(gulp.dest(path.resolve(paths().public.root)))
    .pipe(browserSync.stream());
});

/**
 * Styleguide Copy and flatten css
 */
gulp.task('copy:styleguide-css', function(){
  return gulp.src(path.resolve(paths().source.styleguide, '**/*.css'))
    .pipe(gulp.dest(function(file){
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return path.resolve(path.join(paths().public.styleguide, 'css'));
    }))
    .pipe(browserSync.stream());
});


/**
 * Task: copy:annotations
 * Copies the annotations file to the public data folder
 */
gulp.task('copy:annotations', function(cb){
  return gulp.src(
      'annotations.js',
      {
        cwd: config.paths.source.annotations
      }
    )
    .pipe(gulp.dest(config.paths.public.annotations))
  ;
});


/**
 * Task: copy:javascript
 * Copies the lib javascript to the destination folder
 */
gulp.task('copy:javascript', function(cb){
  return gulp.src(path.resolve(paths().source.js, 'lib/**/*.js'))
    .pipe(gulp.dest(path.resolve(paths().public.js, 'lib/')))
  ;
});


/**
 * Task: copy:nodeModules
 * Copies the lib javascript to the destination folder
 */
gulp.task('copy:nodeModules', function () {
  return es.merge(config.nodeModules.map(function (obj) {
    return gulp.src(path.resolve(paths().source.nodeModules, obj + '**/**'))
      .pipe(gulp.dest(path.resolve(paths().public.js, 'lib/')))
    ;
  }));
});

/**
 * Task: copy:images
 * Copies the image files to the public folder
 * Enable if you want separate source & public folders
 */
// gulp.task('copy:images', function(cb){
//   return gulp.src(
//       '**/*',
//       {
//         cwd: config.paths.source.images
//       }
//     )
//     .pipe(gulp.dest(config.paths.public.images))
//   ;
//   cb();
// });

/**
 * Task: copy:fonts
 * Copies the font files to the public folder
 * Enable if you want separate source & public folders
 */
// gulp.task('copy:fonts', function(cb){
//   return gulp.src(
//       '**/*',
//       {
//         cwd: config.paths.source.fonts
//       }
//     )
//     .pipe(gulp.dest(config.paths.public.fonts))
//   ;
//   cb();
// });

/**
 * Task: copy:assets
 * Copies the asset files to the public folder
 * Enable if you want separate source & public folders
 */
// gulp.task('copy:assets', function(cb){
//   return gulp.src(
//       '**/*',
//       {
//         cwd: config.paths.source.assets
//       }
//     )
//     .pipe(gulp.dest(config.paths.public.assets))
//   ;
//   cb();
// });



/*  Clean
    ========================================================================= */

/**
 * Task: clean:public
 * Cleans up the public folder so there will be no remnants of the
 * previous build
 */
// gulp.task('clean:public', function(cb){
//     del.sync([config.paths.public.root + '*'], {force: true});
//     cb();
// });

gulp.task('clean:pl', function(cb){
    del.sync([config.paths.public.patterns + '*'], {force: true});
    del.sync([config.paths.public.root + 'dependencyGraph.json'], {force: true});
    cb();
});


/*  Task: styles
  Tests for markup errors, compiles and autoprefixes the `scss` files
\*----------------------------------------------------------------------------*/

gulp.task('styles', function(cb){
  return gulp.src(config.paths.source.sass + '**/*.scss')
  .pipe(stylelint({
    reporters: [
      { formatter: 'string', console: true }
    ],
    syntax: 'scss'
  })).on('error', handleError)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: [
      config.paths.source.nodeModules
    ],
    outputStyle: 'compressed'
  }).on('error', handleError))
    .pipe(postcss([
      autoprefixer({
        browsers: packageConfig.browserslist
      })
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.public.css))
    .pipe(browserSync.stream({match: '**/*.css'}))
  ;
});



/*  Task: javascript
  Checks our own javascript files for potential errors.
\*----------------------------------------------------------------------------*/

gulp.task('javascript:dev', function() {
  return gulp.src([
      config.paths.source.js + '**/*.js',
      '!' + config.paths.source.js + 'lib/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', handleError)
    .on('warning', handleError)

    .pipe(babel())
    .pipe(gulp.dest(config.paths.public.js))

  ;
});



/*  Task: svg
    ========================================================================= */

gulp.task('svgstore', function () {
  return gulp
    .src(config.paths.source.svg + '**/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [
          {
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }
        ]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(config.paths.public.svg));
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

function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return path.resolve(paths().source.patterns, '**/*' + dotExtension);
  });
}

gulp.task('watch', function() {
  /**
   * Styles
   */
  var stylesWatcher = gulp.watch('**/*.scss', {cwd: config.paths.source.sass}, ['styles']);
  stylesWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });


  /**
   * Javascripts
   */
  var scriptsWatcher = gulp.watch([
    '**/*.js'
  ], {cwd: config.paths.source.js}, [
    'javascript:dev',
    'copy:javascript',
    'bs-reload'
  ]);
  scriptsWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });


  /**
   * Images
   */
  var imagesWatcher = gulp.watch([
    '**/*'
  ], { cwd: config.paths.source.images }, [
    // 'copy:images',
    'bs-reload'
  ]);
  imagesWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });

  /**
   * SVG
   */
  var svgWatcher = gulp.watch([
    '**/*'
  ], { cwd: config.paths.source.svg }, [
    'svgstore',
    'bs-reload'
  ]);
  svgWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });


  /**
   * Fonts
   */
  var fontsWatcher = gulp.watch([
    '**/*'
  ], { cwd: config.paths.source.fonts }, [
    'copy:fonts',
    'bs-reload'
  ]);
  fontsWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });

  var dataWatchers = [
    config.paths.source.meta.replace(config.paths.source.root, '') + '*',
    config.paths.source.data.replace(config.paths.source.root, '') + '**/*.json'
  ];

  var dataWatcher = gulp.watch(dataWatchers, {cwd:config.paths.source.root}, ['clean:pl', 'lab-pipe'], function () { browserSync.reload(); });
  dataWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });

  var patternWatches = [
    config.paths.source.patterns.replace(config.paths.source.root, '') + '**/*.mustache',
    config.paths.source.patterns.replace(config.paths.source.root, '') + '**/*.md',
    config.paths.source.patterns.replace(config.paths.source.root, '') + '**/*.json',
    '!'+config.paths.source.data.replace(config.paths.source.root, '') + 'data.json',
    config.paths.source.fonts.replace(config.paths.source.root, '') + '**/*',
    config.paths.source.images.replace(config.paths.source.root, '') + '**/*',
    config.paths.source.annotations.replace(config.paths.source.root, '') + '*'
  ];

  var patternWatcher = gulp.watch(patternWatches, {cwd:config.paths.source.root}, ['lab-pipe'], function () { browserSync.reload(); });
  patternWatcher.on('change', function(event){
    console.log(chalk.blue('File ' + event.path.replace(__base, '') + ' was ' + event.type + ', running tasks...'));
  });
});



/*  Patternlab specific tasks
\*----------------------------------------------------------------------------*/

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

/**
 * Task: patternlab
 * Builds the patternlab styleguide
 */
gulp.task('patternlab', function(cb){
  pl.build(cb, getConfiguredCleanOption());
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
 * Task: lab
 * Sequence the prelab and patternlab functions
 */
gulp.task('lab', function(cb){
  runSequence (
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
    // 'clean:public',
    ['lab', /* 'copy:assets',*/ 'copy:styleguide', 'copy:styleguide-css', 'copy:annotations', /* 'copy:images', 'copy:fonts', */ 'javascript:dev', 'copy:javascript', 'copy:nodeModules'],
    'svgstore',
    'styles',
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
