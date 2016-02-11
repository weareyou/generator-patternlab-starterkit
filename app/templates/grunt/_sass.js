module.exports = function(grunt, data) {
    return {
        "options": {
            "precision": 8,
            "loadPath": '<%= paths.src.bower %>'
        },
        "dev": {
            "files": [{
                "expand": true,
                "cwd": "<%= paths.src.sass %>",
                "src": ["**/*.scss"],
                "dest": "<%= paths.dest.css %>",
                "ext": ".css"
            }]
        }
    }
};
