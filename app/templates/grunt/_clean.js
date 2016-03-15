module.exports = function(grunt, data) {
    return {
        <% if (!sameFolder) { %>
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
        "bower": {
            "src": '<%%= paths.dest.bower %>'
        },
        "patternlab": {
            "src": "<%%= paths.dest.html %>"
        },
        "data": {
            "src": "<%%= paths.src.data %>data.json"
        }
    }
};
