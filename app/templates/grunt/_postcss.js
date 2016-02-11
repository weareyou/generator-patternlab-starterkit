module.exports = function(grunt, data) {
    return {
        "options": {
            "map": true,
            "processors": [
                require('autoprefixer-core')({browsers: data.config.browserlist})
            ]
        },
        "dev": {
            "files": [{
                "expand": true,
                "cwd": "<%= paths.dest.css %>",
                "src": ["**/*.css"],
                "dest": "<%= paths.dest.css %>"
            }]
        }
    }
};
