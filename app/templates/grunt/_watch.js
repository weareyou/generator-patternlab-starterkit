module.exports = function(grunt, data) {
    return {
        options: {
            event: ['changed', 'added', 'deleted'],
        },
        sass: {
            files: ["<%%= paths.src.sass %>**/*.{sass,scss}"],
            tasks: [
                "sass:dev",
                "postcss"
            ],
            options: {
                "spawn": false
            }
        },

        bower: {
            files: ["bower.json"],
            tasks: [
                "clean:bower",
                "exec:bower"<% if (!sameFolder) { %>,
                "copy:bower"
                <% } %>
            ],
            options: {
                "spawn": false
            }
        },

        scripts: {
            files: ["<%%= paths.src.js %>**/*.js"],
            tasks: [
                "jshint"<% if (!sameFolder) { %>,
                "clean:js",
                "copy:js"<% } %>
            ],
            options: {
                "spawn": false
            }
        },

        images: {
            files: ["<%%= paths.src.images %>**/*"],
            tasks: [<% if (!sameFolder) { %>
                "clean:images",
                "copy:images"
            <% } %>],
            options: {
                "spawn": false
            }
        },

        fonts: {
            files: ["<%%= paths.src.fonts %>**/*"],
            tasks: [<% if (!sameFolder) { %>
                "clean:fonts",
                "copy:fonts"
            <% } %>],
            options: {
                "spawn": false
            }
        },

        html: {
            files: [
                '<%%= paths.src.patterns %>**/*.{mustache,json}',
                '<%%= paths.src.data %>**/*.{js,json}',
                '!<%%= paths.src.data %>data.json',
                '<%%= paths.src.patternlabFiles %>**/*.{mustache,html,json}'
            ],
            tasks: [
                'clean:patternlab',
                'clean:data',
                'merge-json',
                'copy:annotations',
                'patternlab'
            ],
            options: {
                "spawn": false
            }
        },

        config: {
            files: [
                'config.json'
            ],
            options: {
                "spawn": false
            }
        }
    }
};
