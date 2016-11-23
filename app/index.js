'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  helloworld: function () {
    console.log('hello world');
  }
});