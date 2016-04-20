var gulp = require('gulp');
var config = require('./config.json');

gulp.task('default', function(cb) {
    console.log('Hello world!');
    console.log(config);
});
