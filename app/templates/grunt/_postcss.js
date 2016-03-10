module.exports = function(grunt, data) {
    return {
        "options": {
            "map": true,
            "syntax": require('postcss-scss'),
            "processors": [
                require('autoprefixer')({browsers: data.config.browserlist}),
                require('stylelint')
            ]
        },
        "dev": {
            "files": [{
                "expand": true,
                "cwd": "<%= paths.src.sass %>",
                "src": ["**/*.scss"],
                "dest": "<%= paths.dest.css %>"
            }]
        }
    }
};
