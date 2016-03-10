module.exports = function(grunt, data) {
    return {
        "options": {
            "map": true,
            "processors": [
                require('autoprefixer')({browsers: data.config.browserlist}),
            ]
        },
        "dev": {
            "files": [{
                "expand": true,
                "cwd": "<%= paths.dest.css %>",
                "src": ["**/*.css"],
                "dest": "<%= paths.dest.css %>"
            }]
        },
        "stylelint": {
            "options": {
                "writeDest": false,
                    "syntax": require('postcss-scss'),
                    "processors": [
                        require('stylelint'),
                    ]
                },
            "expand": true,
            "cwd": "<%= paths.src.sass %>",
            "src": ["**/*.scss"],
            "dest": "<%= paths.dest.css %>"
        }
    }
};
