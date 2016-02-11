module.exports = function(grunt, data) {
    return {
        <% if (!sameFolder) { %>
        "bower": {
            "expand": true,
            "cwd": "<%%= paths.src.bower %>",
            "src": ['**/*'],
            "dest": '<%%= paths.dest.bower %>',
        },
        "js": {
            "expand": true,
            "cwd": "<%%= paths.src.js %>",
            "src": ['**/*'],
            "dest": '<%%= paths.dest.js %>',
        },
        "images": {
            "expand": true,
            "cwd": "<%%= paths.src.images %>",
            "src": ['**/*'],
            "dest": '<%%= paths.dest.images %>',
        },
        "fonts": {
            "expand": true,
            "cwd": "<%%= paths.src.fonts %>",
            "src": ['**/*'],
            "dest": '<%%= paths.dest.fonts %>',
        },
        <% } %>
        "styleguide": {
            "expand": true,
            "cwd": "<%%= paths.src.styleguide %>",
            "src": ['**/*'],
            "dest": '<%%= paths.dest.styleguide %>',
        }
    }
};
