'use strict';

const generators = require('yeoman-generator');
const yosay = require('yosay');
const util = require('util');
const lodash = require('lodash');

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
        /**
         * Copy projects package.json
         */
        this._copyTemplate(
            this.templatePath('_package.json'),
            this.destinationPath('package.json')
        );

        /**
         * Copy projects gitignore only if the user selects it
         */
        if (this.answers.gitignore) {
            this._copyTemplate(
                this.templatePath('_.gitignore'),
                this.destinationPath('.gitignore')
            );
        }
    },


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
