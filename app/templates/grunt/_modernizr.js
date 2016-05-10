module.exports = function(grunt, data) {
    return {
        "prepare": {
            // Path to the build you're using for development.
            "devFile" : "<%= paths.dest.js %>lib/modernizr.development.js",

            // Path to save out the built file.
            "dest" : "<%= paths.dest.js %>lib/modernizr.build.js",

            "classPrefix": "<%= config.modernizrCssPrefix %>",

            "options": [
                "addTest",
                "testProp",
                "setClasses",
                "prefixed",
                "mq"
            ],

            // When crawl = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            "files" : {
                "src": [
                    "<%= paths.dest.js %>**/*.js",
                    "!<%= paths.dest.js %>lib/modernizr.*.js",
                    "<%= paths.dest.css %>**/*.css"
                ]
            }
        },

        "dev": {
            // Empty, because this task is generating the dev build
            "devFile" : false,

            // Path to save out the built file.
            "dest" : "<%= paths.dest.js %>lib/modernizr.development.js",

            "classPrefix": "<%= config.modernizrCssPrefix %>",

            "crawl": false,

            "options": [
                "addTest",
                "testProp",
                "setClasses",
                "prefixed",
                "mq"
            ],

            // All tests, add some if modernizr supports them
            "tests": data.config.modernizrAllTests
        }
    }
};
