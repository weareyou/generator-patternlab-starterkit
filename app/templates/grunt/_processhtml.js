module.exports = function(grunt, data) {
    return {
        options: {
            recursive: true,
            process: true,
            includeBase: '<%= paths.src.patternlabFiles %>partials/'
        },
        patterns: {
            files: [{
                expand: true,
                cwd: '<%= paths.dest.html %>',
                src: ['**/*.html', '!**/*.escaped.html'],
                dest: '<%= paths.dest.html %>',
                ext: '.html'
            }]
        },
        styleguide: {
            files: [{
                expand: true,
                cwd: '<%= paths.dest.styleguide %>',
                src: ['**/*.html', '!**/*.escaped.html'],
                dest: '<%= paths.dest.styleguide %>',
                ext: '.html'
            }]
        }
    }
};
