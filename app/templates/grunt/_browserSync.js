module.exports = {
    dev: {
        bsFiles: {
            src : [
                '<%= paths.dest.css %>**/*.css',
                '<%= paths.dest.js %>**/*.js',
                '!<%= paths.dest.js %>lib/modernizr.js',
                '<%= paths.dest.root %>index.html'
            ]
        },
        options: {
            server: "./",
            startPath: "<%= variables.connect.path %>",
            watchTask: true
        }
    }
};
