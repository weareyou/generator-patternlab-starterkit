module.exports = function(grunt, data) {
    return {
        "options": {
            "jshintrc": '.jshintrc',
            "reporter": require('jshint-stylish')
        },
        "all": [
            '<%= paths.src.js %>**/*.js',
            '!<%= paths.src.js %>lib/**/*.js'
        ]
    }
};
