const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const slugify = require('slugify');

module.exports = class extends Generator {
  initializing() {
    this.pkg = require('../package.json');
  }

  async prompting() {
    this.log(yosay('Welcome to the Patternlab starterkit generator!'));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'scaffoldPath',
        message: 'Where do you want the patternlab folder to be generated?',
        default: 'public'
      }
    ];

    this.answers = await this.prompt(prompts);
    this.sourceJsFolder = '/_js';
    this.publicJsFolder = 'js';
  }

  copyingDependencyFiles() {
    this.fs.copyTpl(
      this.templatePath('?(.*|*.*|config/**/*)'),
      this.destinationPath('.'),
      {
        ...this.answers,
        projectSlug: slugify(this.answers.projectName),
        sourceJsFolder: this.sourceJsFolder,
        publicJsFolder: this.publicJsFolder,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_labtemplates'),
      this.destinationPath(this.answers.scaffoldPath),
    )
  }

  /*

  copyingPatternFiles: function(){
    var done = this.async();

    // Copy predefined templates to source folder
    this.directory('_labtemplates', this.scaffoldPath);

    // Copy webpack config files to source folder
    this.directory('_config', 'config');

    done();
  },

  copyingJsFiles: function() {
    var done = this.async();

    this.mkdir(this.scaffoldPath + this.publicJsFolder);
    // this.copy('js/_entry.js', this.scaffoldPath + this.sourceJsFolder + '/entry.js');
    // this.copy('js/_entry.legacy.js', this.scaffoldPath + this.sourceJsFolder + '/entry.legacy.js');
    done();
  },

  installingDependencies: function () {
    this.on('end', function() {
      this.installDependencies({
        bower: false,
        callback: function () {
          var log = chalk.red(this.projectName) + ' is ready! Type "'+chalk.blue('npm run start')+'" to start developing on your styleguide. Type "'+chalk.blue('npm run build')+'" to generate production-ready optimized JS & CSS bundles.';
          this.log(yosay(log));
        }.bind(this)
      });
    });
  }

   */
};
