module.exports = {
    dist: {
        // [REQUIRED] Path to the build you're using for development.
        "devFile" : false,

        // [REQUIRED] Path to save out the built file.
        "dest" : "<%= paths.dest.js %>lib/modernizr.js",

        "options": [
            "addTest",
            "testProp",
            "setClasses",
            "prefixed",
            "mq"
        ],

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        "files" : {
            "src": [
                "<%= paths.dest.js %>**/*.js",
                "<%= paths.dest.css %>**/*.css"
            ]
        }
    }
};
