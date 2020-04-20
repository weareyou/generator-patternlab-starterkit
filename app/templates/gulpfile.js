const {
  series, parallel, src, dest, watch,
} = require('gulp');
const path = require('path');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-dart-sass');
const tildeImporter = require('node-sass-tilde-importer');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const patternlabNode = require('patternlab-node');
const svgSprite = require('gulp-svg-sprite');

const config = require('./config');
const webpackConfigDev = require('./config/webpack.dev');
const webpackConfigES5 = require('./config/webpack.es5');
const webpackConfigES6 = require('./config/webpack.es6');


/*----------------------------------------------------------------------------*\
    Internal Tasks
\*----------------------------------------------------------------------------*/

/*  Copy
\*----------------------------------------------------------------------------*/

/**
 * Task: copy:styleguide
 * Copies the patternlab styleguide to the public folder
 */
const copyStyleguideTask = () => (
  src(path.resolve(config.paths.source.styleguide, '**/!(*.css)'))
    .pipe(dest(path.resolve(config.paths.public.root)))
);


/**
 * Styleguide Copy and flatten css
 */
const copyStyleguideCssTask = () => (
  src(path.resolve(config.paths.source.styleguide, '**/*.css'))
    .pipe(dest((file) => {
      // flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return path.resolve(path.join(config.paths.public.styleguide, 'css'));
    }))
);


/**
 * Task: copy:annotations
 * Copies the annotations file to the public data folder
 */
const copyAnnotationsTask = () => (
  src(`${config.paths.source.annotations}annotations.js`)
    .pipe(dest(config.paths.public.annotations))
);


/**
 * Task copy:assets
 */
const copyAssetsTask = () => (
  src(`${config.paths.source.assets}**/*`)
    .pipe(dest(config.paths.public.assets))
);



/*  Task: styles
    Tests for markup errors, compiles and autoprefixes the `scss` files
\*----------------------------------------------------------------------------*/

const stylesDevTask = () => (
  src(`${config.paths.source.sass}**/*.scss`)
    .pipe(plumber({
      errorHandler: (err) => {
        notify.onError({
          title: `Error in ${err.plugin}`,
          message: err.message,
        })(err);
        browserSync.notify(`${err.plugin}: ${err.message}`, 10000);
      },
    }))
    .pipe(stylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
      syntax: 'scss',
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter,
      precision: 8,
    }))
    .pipe(postcss())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.paths.public.css))
    .pipe(browserSync.stream())
);

const stylesProdTask = () => (
  src(`${config.paths.source.sass}**/*.scss`)
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter, // enable imports from /node_modules/ using tilde character
      precision: 8,
    }))
    .pipe(postcss()) // default postcss.config.js
    .pipe(postcss([ // extra: minification
      cssnano(),
    ]))
    .pipe(rename({ suffix: '.min' })) // rename to [filename].min.css
    .pipe(dest(config.paths.public.css))
);



/*  Task: javascript
    Checks our own javascript files for potential errors.
\*----------------------------------------------------------------------------*/

const javascriptDevTask = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigDev, webpack, (err, stats) => {
      // log errors and warnings
      if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({ colors: true }));
        const info = stats.toJson();
        browserSync.notify(`Script error: ${info.errors}`, 10000);
      }

      // if there are no errors, reload
      if (!stats.hasErrors()) {
        bsReloadTask(cb);
      }
    }))
    .pipe(dest(config.paths.public.js));
  cb();
};

const javascriptES6Task = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigES6, webpack, () => cb()))
    .pipe(dest(config.paths.public.js));
};

exports.es6 = javascriptES6Task;

const javascriptES5Task = (cb) => {
  src(`${config.paths.source.js}**/*.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigES5, webpack, () => cb()))
    .pipe(dest(config.paths.public.js));
};

exports.es5 = javascriptES5Task;

const javascriptProdTask = parallel(
  javascriptES5Task,
  javascriptES6Task,
);



/*  Task: svg
\*----------------------------------------------------------------------------*/

const svgSpriteTask = () => (
  src('**/*.svg', { cwd: config.paths.source.svg })
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.',
        },
      },
    }))
    .pipe(dest(config.paths.public.svg))
);



/*  Task: connect
    Fires up a development server using browserSync
\*----------------------------------------------------------------------------*/

const connectTask = () => {
  browserSync.init({
    server: './',
    startPath: `${config.paths.public.root}index.html`,
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: [`${config.paths.public.root}index.html`, config.paths.public.root, `${config.paths.public.root}index.html/?*`],
    },
  });
};



/*  Patternlab specific tasks
\*----------------------------------------------------------------------------*/

// create patternlab instance
const pl = patternlabNode(config);


/**
 * Task: patternlab
 * (Re)builds the patternlab styleguide
 */
const patternlabTask = (cb) => {
  pl.build(cb, config.cleanPublic);
};


/**
 * Task: fullPatternlab
 * Builds the full patternlab styleguide
 */
const fullPatternlabTask = (cb) => {
  pl.build(cb, true);
};



/*  Task: bs-reload
    A task to reload browserSync from other tasks
\*----------------------------------------------------------------------------*/

const bsReloadTask = (cb) => {
  browserSync.reload();
  cb();
};



/*  Task: watch
    Setup files watches to track changes/additions/deletions of files and take
    action upon those changes
\*----------------------------------------------------------------------------*/

const watchTask = (cb) => {
  /**
   * Styles
   */
  watch(`${config.paths.source.sass}**/*.scss`, series(stylesDevTask));

  /**
   * SVG
   */
  watch(`${config.paths.source.svg}**/*.svg`, series(svgSpriteTask, bsReloadTask));

  /**
   * Patterns
   */
  watch([
    config.paths.source.meta,
    config.paths.source.patterns,
  ], series(patternlabTask, bsReloadTask));

  /**
   * Data
   */
  watch(config.paths.source.data, series(fullPatternlabTask, bsReloadTask));

  /**
   * Assets (enable if your assets public path differs from the source)
   */
  // watch(config.paths.source.assets, series(copyAssetsTask, bsReloadTask));

  cb();
};


/* ----------------------------------------------------------------------------*\
    External tasks
    Tasks which will be used from the command line. These tasks chain together
    all other tasks mentioned in this file.
\*----------------------------------------------------------------------------*/

/**
 * task: default
 * Prepares the code one time
 */
const defaultTask = parallel(
  fullPatternlabTask,
  copyStyleguideTask,
  copyStyleguideCssTask,
  copyAnnotationsTask,
  copyAssetsTask,
  svgSpriteTask,
);

/**
 * task: serve
 * Prepares the code, fires up a development server and sets up watch tasks
 */
exports.serve = series(
  defaultTask,
  javascriptDevTask,
  stylesDevTask,
  watchTask,
  connectTask,
);


/**
 * task: build
 * Build production JS & CSS bundles
 */
exports.build = parallel(
  defaultTask,
  javascriptProdTask,
  stylesProdTask,
);
