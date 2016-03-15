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
                name: 'pathSource',
                message: 'Where do you want the source folder to be?',
                default: 'source'
            },
            {
                type: 'input',
                name: 'pathPublic',
                message: 'Where do you want the public folder to be?',
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
                        name: 'Angular (~1.3.2)',
                        value: 'includeAngular'
                    },
                    {
                        name: 'jQuery (~2.1.1)',
                        value: 'includeJquery'
                    },
                    {
                        name: 'Modernizr/Grunt-Modernizr (v3.x.x)',
                        value: 'includeModernizr'
                    },
                    {
                        name: 'Blocss (~6.0)',
                        value: 'includeBlocss'
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
            this.pathSource = props.pathSource;
            this.pathPublic = props.pathPublic;
            this.connectPath = '/' + this.pathPublic;
            this.copyGitignore = props.copyGitignore;
            this.includeAngular = hasFeature('includeAngular');
            this.includeJquery = hasFeature('includeJquery');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeBlocss = hasFeature('includeBlocss');
            this.projectType = props.projectType;
            this.sameFolder = false;

            this.dependencies = {};

            if ( this.includeAngular ) {
                this.dependencies["angularjs"] = "~1.3.2";
            }

            if ( this.includeJquery ) {
                this.dependencies["jquery"] = "~2.1.1";
            }

            if ( this.includeBlocss ) {
                this.dependencies["blocss"] = "~6.0";
            }

            if ( this.pathSource === this.pathPublic ) {
                this.sameFolder = true;
            }

            cb();

        }.bind(this));

    },

    copyingDependencyFiles: function() {
        var done = this.async();

        this.copy('_package.json', 'package.json');
        this.copy('_config.json', 'config.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_.bowerrc', '.bowerrc');

        this.template('_Gruntfile.js', 'Gruntfile.js');

        if (this.copyGitignore) {
            this.template('_.gitignore', '.gitignore');
        }

        this.mkdir('grunt');
        this.copy('grunt/_aliases.yaml', 'grunt/aliases.yaml');
        this.copy('grunt/_sass.js', 'grunt/sass.js');
        this.template('grunt/_clean.js', 'grunt/clean.js');
        this.template('grunt/_copy.js', 'grunt/copy.js');

        this.copy('grunt/_postcss.js', 'grunt/postcss.js');
        this.copy('_.stylelintrc', '.stylelintrc');
        this.copy('grunt/_jshint.js', 'grunt/jshint.js');
        this.copy('_.jshintrc', '.jshintrc');
        this.copy('grunt/_notify_hooks.js', 'grunt/notify_hooks.js');

        this.copy('grunt/_exec.js', 'grunt/exec.js');
        this.template('grunt/_watch.js', 'grunt/watch.js');

        if (this.includeModernizr) {
            this.copy('grunt/_modernizr.js', 'grunt/modernizr.js');
        }

        // BrowserSync
        this.copy('grunt/_browserSync.js', 'grunt/browserSync.js');
        this.copy('grunt/_merge-json.js', 'grunt/merge-json.js');

        done();
    },

    copyingPatternFiles: function(){
        var done = this.async();

        this.mkdir(this.pathPublic);
        this.copy('_.gitkeep', this.pathPublic + '/.gitkeep');

        // Copy predefined templates to source folder
        this.directory('_labtemplates', this.pathSource);

        done();
    },

    copyingJsFiles: function() {
        var done = this.async();

        this.mkdir(this.pathSource + '/js');
        this.mkdir(this.pathSource + '/js/lib');
        this.mkdir(this.pathSource + '/js/app');
        this.copy('_.gitkeep', this.pathSource + '/js/lib/.gitkeep');
        this.copy('js/_main.js', this.pathSource + '/js/app/main.js');

        done();
    },

    installingDependencies: function () {
        this.on('end', function() {
            this.installDependencies({
                callback: function () {
                    this.log(yosay('Your project is ready! Type "grunt serve" to start developing on your styleguide. Type "grunt" once for a single compile.'));
                }.bind(this)
            });
        });
    }
});
