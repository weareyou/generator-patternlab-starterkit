'use strict';

const generators = require('yeoman-generator');
const yosay = require('yosay');

module.exports = generators.Base.extend({

    /**
     * Promts the user with some questions about the project
     */
    prompting: function () {
        this.log(yosay('Welcome to the Patternlab starterkit generator!'));

        return this.prompt([
            {
                type    : 'input',
                name    : 'projectname',
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
            this.log('projectname', answers.projectname);
            this.log('scaffoldPath', answers.projectname);
            this.log('gitignore', answers.gitignore);
        }.bind(this));
    }
});
