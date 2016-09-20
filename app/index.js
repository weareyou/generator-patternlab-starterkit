'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PatternlabGenerator = module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var cb = this.async();

        this.log(yosay('Welcome to the Patternlab starterkit generator!'));

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What is the name of your project?',
                default: 'Patternlab Starterkit'
            },
            {
                type: 'input',
                name: 'scaffoldPath',
                message: 'Where do you want the patternlab folder to be generated?',
                default: 'public'
            },
            {
                type: 'list',
                message: 'Do you want to copy gitignore? If you already have a gitignore choose "No"',
                name: 'copyGitignore',
                choices: [
                    {
                        name: 'Yes',
                        value: true
                    },
                    {
                        name: 'No',
                        value: false
                    }
                ]
            },
            {
                type: 'checkbox',
                message: 'Do you want to install some handy defaults?',
                name: 'features',
                choices: [
                    {
                        name: 'ECMAScript 2015, http://git.io/es6features',
                        value: 'includeBabel',
                        checked: true
                    },
                    {
                        name: 'Blocss (~6.0), a small but powerfull css framework designed specially for serious developers',
                        value: 'includeBlocss',
                        checked: true
                    }
                ]
            }
        ];

        this.prompt(prompts, function(props) {
            var features = props.features;
            var gruntfeatures = props.gruntfeatures;
            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.currentYear = new Date().getFullYear();

            this.projectName = props.projectName;
            this.scaffoldPath = props.scaffoldPath;
            this.connectPath = '/' + this.scaffoldPath;
            this.copyGitignore = props.copyGitignore;
            this.includeBlocss = hasFeature('includeBlocss');
            this.includeBabel = hasFeature('includeBabel');
            this.projectType = props.projectType;

            this.dependencies = {};

            this.sourceJsFolder = '/js';
            this.publicJsFolder = '/js';

            if (this.includeBabel) {
                this.sourceJsFolder = '/_js';
            }

            if ( this.includeBlocss ) {
                this.dependencies["blocss"] = "~6.0";
            }

            cb();

        }.bind(this));

    },

    copyingDependencyFiles: function() {
        var done = this.async();

        this.template('_package.json', 'package.json');
        this.template('_config.json', 'config.json');
        this.template('_bower.json', 'bower.json');
        this.template('_.bowerrc', '.bowerrc');

        if (this.copyGitignore) {
            this.template('_.gitignore', '.gitignore');
        }

        this.template('_gulpfile.js', 'gulpfile.js');

        this.template('_.stylelintrc', '.stylelintrc');
        this.template('_.eslintrc', '.eslintrc');

        done();
    },

    copyingPatternFiles: function(){
        var done = this.async();

        // Copy predefined templates to source folder
        this.directory('_labtemplates', this.scaffoldPath);

        done();
    },

    copyingJsFiles: function() {
        var done = this.async();
        this.mkdir(this.scaffoldPath + this.sourceJsFolder);

        if (this.includeBabel) {
            this.mkdir(this.scaffoldPath + this.publicJsFolder);
        }

        this.mkdir(this.scaffoldPath + this.sourceJsFolder + '/lib');
        this.mkdir(this.scaffoldPath + this.sourceJsFolder + '/app');
        this.copy('_.gitkeep', this.scaffoldPath + this.sourceJsFolder + '/lib/.gitkeep');
        this.copy('js/_main.js', this.scaffoldPath + this.sourceJsFolder + '/app/main.js');

        done();
    },

    installingDependencies: function () {
        this.on('end', function() {
            this.installDependencies({
                callback: function () {
                    var log = chalk.red(this.projectName) + ' is ready! Type "'+chalk.blue('gulp serve')+'" to start developing on your styleguide. Type "'+chalk.blue('gulp prepare')+'" once for a single compile.';
                    this.log(yosay(log));
                }.bind(this)
            });
        });
    }
});
