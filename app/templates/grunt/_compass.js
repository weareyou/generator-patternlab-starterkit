module.exports = function(grunt, data) {
    return {
        "dev": {
            "options": {
                "sassDir": "<%= paths.src.sass %>",
                "cssDir": "<%= paths.dest.css %>",
                "outputStyle": "compressed"
            }
        }
    }
};
