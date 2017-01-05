'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const util = require('util');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = class extends Generator {

    /**
     * Promts the user with some questions about the project
     */
    prompting () {
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
                type    : 'list',
                name    : 'starterkit',
                message : 'Which starterkit do you want to use?',
                choices: [
                    'starterkit-mustache-demo',
                    'starterkit-colours-mustache'
                ]
            }
        ]).then(function (answers) {
            // Logs the answers into the answers object
            this.answers = answers;
        }.bind(this));
    }


    copyDependencyFiles () {
        var done = this.async();
        // Process _root folder and its contents
        this._processDirectory(
            '_root',
            this.destinationPath(''),
            done()
        );
    }


    setupDependencies () {
        // var done = this.async();
        this.installDependencies({
            npm: true,
            bower: false,
            callback: function () {

                var done = function () {
                    this._finalise();
                }.bind(this);

                this.spawnCommand('gulp', [
                    'patternlab:loadstarterkit',
                    '--kit=' + this.answers.starterkit
                ]).on('close', done);

            }.bind(this)
        });
    }

    _finalise () {
        this.log(yosay(this.answers.projectName + ' is ready! Type "npm run serve" to start development server. Type "npm run watch" to watch & compile changed files. Type "npm run prepare" to compile once.'));
    }


    end () {}


    /**
     * Processes a directory and passes template files to _copyTemplate
     */
    _processDirectory (source, destination, callback) {
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

        callback();
    }


    /**
     * Copies and parses templates to their destinations
     */
    _copyTemplate (templatePath, destinationPath) {
        this.fs.copyTpl(
            templatePath,
            destinationPath,
            {
                _: lodash,
                answers: this.answers
            }
        );
    }
};
