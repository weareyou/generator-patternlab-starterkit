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
      }
    ];

    this.prompt(prompts, function(props) {
      this.currentYear = new Date().getFullYear();

      this.projectName = props.projectName;
      this.scaffoldPath = props.scaffoldPath;
      this.connectPath = '/' + this.scaffoldPath;
      this.copyGitignore = props.copyGitignore;
      this.projectType = props.projectType;

      this.dependencies = {};

      this.sourceJsFolder = '/_js';
      this.publicJsFolder = '/js';

      cb();

    }.bind(this));

  },

  copyingDependencyFiles: function() {
    var done = this.async();

    this.template('_.babelrc', '.babelrc');
    this.template('_.editorconfig', '.editorconfig');
    this.template('_.eslintrc', '.eslintrc');
    this.template('_.stylelintrc', '.stylelintrc');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    this.template('_gulpfile.babel.js', 'gulpfile.babel.js');
    this.template('_postcss.config.js', 'postcss.config.js');

    if (this.copyGitignore) {
      this.template('_.gitignore', '.gitignore');
    }

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

    this.mkdir(this.scaffoldPath + this.publicJsFolder);
    this.copy('js/_bundle.js', this.scaffoldPath + this.sourceJsFolder + '/bundle.js');

    done();
  },

  installingDependencies: function () {
    this.on('end', function() {
      this.installDependencies({
        bower: false,
        callback: function () {
          var log = chalk.red(this.projectName) + ' is ready! Type "'+chalk.blue('gulp serve')+'" to start developing on your styleguide. Type "'+chalk.blue('gulp build')+'" once for a single compile. Type "'+chalk.blue('gulp prepare')+'" to generate production-ready optimized JS & CSS bundles.';
          this.log(yosay(log));
        }.bind(this)
      });
    });
  }
});
