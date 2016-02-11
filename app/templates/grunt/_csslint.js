module.exports = function(grunt, data) {
    return {
        "options": {
            "csslintrc": ".csslintrc"
        },
        "strict": {
            "src": [
                '<%= paths.dest.css %>**/*.css'
            ]
        }
    }
};
