'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  helloworld: function () {
    console.log('hello world');
  }
});