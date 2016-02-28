module.exports = function(grunt, data) {
    return {
        <% if (!sameFolder) { %>
        "bower": {
            "src": '<%%= paths.dest.bower %>'
        },
        "js": {
            "src": '<%%= paths.dest.js %>'
        },
        "images": {
            "src": "<%%= paths.dest.images %>"
        },
        "fonts": {
            "src": "<%%= paths.dest.fonts %>"
        },
        <% } %>
        "patternlab": {
            "src": "<%%= paths.dest.html %>"
        },
        "data": {
            "src": "<%%= paths.src.data %>data.json"
        }
    }
};
