# generator-patternlab-starterkit - v1.7.0

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Sass, Autoprefixer, Babel, Bundle splitting, modern+legacy JS output) and front-end dependencies ([Supple](https://github.com/supple-css/supple), ConditionerJS, etc.).


## Prerequisites
Make sure Node 12 and npm are installed. A great guide can be found here: [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)


## Installation
Please make sure your system meets the [prerequisites](#prerequisites)
- From the terminal / command prompt, navigate to your site's directory.
- Type `npm init yo patternlab-starterkit`, answer a few questions about your project, and wait.
- Bask in the glory of your fully scaffolded patternlab installation.


## Alternative installation method
- Install Yeoman `npm install -g yo` (one-time global install) or update: `npm update -g yo`.
- Install this generator with `npm install -g generator-patternlab-starterkit` (one-time global install) or update: `npm update -g generator-patternlab-starterkit`.
- Run `yo patternlab-starterkit`.


## Getting Started
### Front-end developing
Run `npm run start` from the commandline. This creates all patterns, the styleguide, and the pattern lab site by BrowserSync which serves the files to you.


### Deployments
For a single compile of all code, you can run `npm run build`. This will compile the front-end one single time.


## Featureset
In general refer to [patternlab-node](https://github.com/pattern-lab/patternlab-node) for more in depth documentation about the use of patternlab.
generator-patternlab-starterkit has some important additions compared to patternlab-node:


### Dart Sass
[Dart Sass](https://sass-lang.com/dart-sass) is the primary implementation of Sass, which means it gets new features before any other implementation. It's fast, easy to install, and it compiles to pure JavaScript which makes it easy to integrate into modern web development workflows.


### Supple CSS
[Supple CSS](https://github.com/supple-css/supple) is a small but powerfull (S)CSS framework designed specially with the latest browsers in mind. The framework is made with an eye on the future. It uses custom properties for configuration and utilises new CSS webstandards.


### PostCSS
[PostCSS](https://postcss.org/) is installed by default, and plugins are configured in `postcss.config.js`. You can add more PostCSS plugins here. [Autoprefixer](https://github.com/postcss/autoprefixer) makes sure that all our CSS can be written prefix-free while the prefixes are added later on based on the supported browsers. You can add/remove supported browsers by changing the `browserlist` property in `package.json`. [PostCSS Normalize](https://github.com/csstools/postcss-normalize/blob/master/README.md) lets you use the parts of normalize.css you need from your browserslist.

### Stylelint
[Stylelint](https://github.com/stylelint/stylelint) is used to enforce some kind of code style throughout the project. By default we have some default checks in `.stylelintrc`, you can alter them per project.

### ESLint
[ESLint](http://eslint.org/) is a tool that helps to detect errors and potential problems in your JavaScript code. By default we have some default checks in `.eslintrc`, you can alter them per project.

### Conditioner
[Conditioner.js](https://github.com/rikschennink/conditioner): Frizz free, context-aware, JavaScript modules.

### Modern and legacy JS output
A smaller and faster bundle is built as `bundle.es6.js`, and a bundle for browsers that don't support modules a `bundle.es5.js` is built.

## Contributing
If you have any ideas or additions for this project please refer to the [contributing guide](CONTRIBUTING.md)
