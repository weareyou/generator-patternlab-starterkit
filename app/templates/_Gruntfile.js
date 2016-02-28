module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = grunt.file.readJSON('./config.json');

    var paths = {
        src: {
            root: config.paths.source.root,
            bower: config.paths.source.bower,
            sass: config.paths.source.sass,
            fonts: config.paths.source.fonts,
            js: config.paths.source.js,
            images: config.paths.source.images,
            patterns: config.paths.source.patterns,
            patternlabFiles: config.paths.source.patternlabFiles,
            data: config.paths.source.data,
            styleguide: config.paths.source.styleguide
        },
        dest: {
            root: config.paths.public.root,
            bower: config.paths.public.bower,
            css: config.paths.public.css,
            fonts: config.paths.public.fonts,
            js: config.paths.public.js,
            images: config.paths.public.images,
            html: config.paths.public.patterns,
            data: config.paths.public.data,
            styleguide: config.paths.public.styleguide
        }
    };

    var variables = {
        connect: {
            host: 'localhost',
            path: '<%= connectPath %>',
            base: ''
        }
    };

    var pl = require('patternlab-node')(config);


    require('load-grunt-config')(grunt, {
        config: {
            paths: paths,
            variables: variables,
            config: config
        }
    });

    grunt.registerTask('patternlab', function (done) {
        pl.build(true);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });
};
