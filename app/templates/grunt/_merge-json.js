module.exports = function(grunt, data) {
    return {
        dev: {
            src: [
                '<%= paths.src.data %>**/*.json',
                '!<%= paths.src.data %>listitems.json',
                '!<%= paths.src.data %>data.json'
            ],
            dest: '<%= paths.src.data %>data.json',
        }
    }
};
