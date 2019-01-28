'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


module.exports = class extends yeoman {

  initializing () {
    this.pkg = require('../package.json');
  }

  prompting () {
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

  }

  copyingDependencyFiles() {
    var done = this.async();

    this.template('_package.json', 'package.json');
    this.template('_config.json', 'config.json');
    this.template('_.editorconfig', '.editorconfig');
    this.template('_.babelrc', '.babelrc');

    if (this.copyGitignore) {
      this.template('_.gitignore', '.gitignore');
    }

    this.template('_gulpfile.js', 'gulpfile.js');

    this.template('_.stylelintrc', '.stylelintrc');
    this.template('_.eslintrc', '.eslintrc');

    done();
  }

  copyingPatternFiles(){
    var done = this.async();

    // Copy predefined templates to source folder
    this.directory('_labtemplates', this.scaffoldPath);

    done();
  }

  copyingJsFiles() {
    var done = this.async();
    this.mkdir(this.scaffoldPath + this.sourceJsFolder);
    this.mkdir(this.scaffoldPath + this.publicJsFolder);

    this.mkdir(this.scaffoldPath + this.sourceJsFolder + '/lib');
    this.mkdir(this.scaffoldPath + this.sourceJsFolder + '/app');
    this.copy('_.gitkeep', this.scaffoldPath + this.sourceJsFolder + '/lib/.gitkeep');
    this.copy('js/_main.js', this.scaffoldPath + this.sourceJsFolder + '/app/main.js');

    done();
  }

  installingDependencies() {
    this.on('end', function() {
      this.installDependencies({
        bower: false,
        callback: function () {
          var log = chalk.red(this.projectName) + ' is ready! Type "'+chalk.blue('gulp serve')+'" to start developing on your styleguide. Type "'+chalk.blue('gulp prepare')+'" once for a single compile.';
          this.log(yosay(log));
        }.bind(this)
      });
    });
  }
};
