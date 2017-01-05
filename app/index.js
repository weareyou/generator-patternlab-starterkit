'use strict';

const generators = require('yeoman-generator');
const yosay = require('yosay');
const util = require('util');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = generators.Base.extend({

    /**
     * Promts the user with some questions about the project
     */
    prompting: function () {
        this.log(yosay('Welcome to the Patternlab starterkit generator!'));

        return this.prompt([
            {
                type    : 'input',
                name    : 'projectName',
                message : 'What is the name of your project?',
                default : 'Patternlab Starterkit' // Default to current folder name
            }, {
                type    : 'input',
                name    : 'scaffoldPath',
                message : 'Where do you want the patternlab folder to be generated?',
                default : 'public'
            }, {
                type    : 'confirm',
                name    : 'gitignore',
                message : 'Do you want to copy gitignore?'
            }
        ]).then(function (answers) {
            // Logs the answers into the answers object
            this.answers = answers;
        }.bind(this));
    },

    copyDependencyFiles: function () {
        // Process _root folder and its contents
        this._processDirectory('_root', this.destinationPath(''));
    },


    /**
     * Processes a directory and passes template files to _copyTemplate
     */
    _processDirectory: function(source, destination) {
        var root = path.join(this.sourceRoot(), source);
        var files = glob.sync('**', { dot: true, cwd: root });

        // Loop over files
        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            // Check if file is actually a file
            if (fs.lstatSync(root + '/' + f).isFile()) {
                var src = path.join(root, f);
                var dest;
                if (path.basename(f).indexOf('_') === 0) {
                    dest = path.join(destination,
                        path.dirname(f),
                        path.basename(f).replace(/^_/, '')
                    );
                    this._copyTemplate(src, dest);
                } else {
                    dest = path.join(destination, f);
                    this.copy(src, dest);
                }
            }
        }
    },


    /**
     * Copies and parses templates to their destinations
     */
    _copyTemplate: function (templatePath, destinationPath) {
        this.fs.copyTpl(
            templatePath,
            destinationPath,
            {
                _: lodash,
                answers: this.answers
            }
        );
    }
});
