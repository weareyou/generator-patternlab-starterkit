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

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'sourcePath',
        message: 'Where do you want your source files to be located?',
        default: 'src',
      },
      {
        type: 'input',
        name: 'publicPath',
        message: 'Where do you want the patternlab folder to be generated?',
        default: 'public',
      },
      {
        type: 'input',
        name: 'distPath',
        message: 'Where do you want your production bundles to be generated?',
        default: 'dist',
      },
    ];

    this.answers = await this.prompt(prompts);
  }

  copyingDependencyFiles() {
    this.fs.copyTpl(
      this.templatePath('?(*.*)'),
      this.destinationPath('.'),
      {
        ...this.answers,
        projectSlug: slugify(this.answers.projectName),
      },
    );

    this.fs.copyTpl(
      this.templatePath('config/**'),
      this.destinationPath('.'),
    );

    this.fs.copyTpl(
      this.templatePath('_labtemplates'),
      this.destinationPath(this.answers.sourcePath),
      { ...this.answers },
    );

    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('_labtemplates/**/.*'),
      this.destinationPath(this.answers.sourcePath),
    );
  }

  install() {
    // this.npmInstall();
  }

  done() {
    const log = `${chalk.red(this.answers.projectName)} is ready! Type "${chalk.blue('npm run serve')}" to start developing on your styleguide. Type "${chalk.blue('npm run build')}" to generate production-ready optimized JS & CSS bundles.`;
    this.log(yosay(log));
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
