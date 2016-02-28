module.exports = function(grunt, data) {
    return {
        "bower": {
            "stdout": true,
            "command": 'bower install && bower update'
        }
    }
};
