/**
 * Define a globals
 */
global.__base = __dirname + '/';
global.__config = require('./config.json');


/**
 * Require needed modules
 */
var gulp = require('gulp');
var gulpRequireTasks = require('gulp-require-tasks');
var runSequence = require('run-sequence');


/**
 * Require all tasks
 */
gulpRequireTasks({
    path: __dirname + '/tasks'
});


/**
 * Default task
 */
gulp.task('default', function(cb) {
    console.log('Hello world!');
    runSequence (
        'styles'
    );
});
