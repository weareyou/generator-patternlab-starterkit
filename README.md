# generator-patternlab-starterkit - v1.4.0

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Sass, Autoprefixer, Bower, Grunt) and front-end dependencies (Angular, jQuery, Modernizr, [Blocss](https://github.com/Blocss/blocss) etc.).


<a name="prerequisites"></a>
## Prerequisites
Make sure Node and npm are installed. A great guide can be found here: [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

- Install Yeoman, Bower `npm install -g yo bower grunt-cli gulp` (one-time global install) or update: `npm update -g yo bower grunt-cli gulp`.
- Install this generator with `npm install -g generator-patternlab-starterkit` (one-time global install) or update: `npm update -g generator-patternlab-starterkit`.

**Note**: Mac users need to run above commands with sudo.

## Installation
Please make sure your system meets the [prerequisites](#prerequisites)
- Run `npm update -g generator-patternlab-starterkit`
- From the terminal, navigate to your site's directory.
- Type `yo patternlab-starterkit`, answer a few questions about your project, and wait.
- Bask in the glory of your fully scaffolded patternlab installation.


## Getting Started
### Front-end developing
Run `gulp serve` from the commandline. This creates all patterns, the styleguide, and the pattern lab site by BrowserSync which serve the files to you.


### Deployments
For a single compile of all code, to build on a server for example, you can run `gulp prepare`. This will compile the front-end one single time.



## Featureset
In general refer to [patternlab-node](https://github.com/pattern-lab/patternlab-node) for more in depth documentation about the use of patternlab.
generator-patternlab-starterkit has some important additions compared to patternlab-node:


### LibSass
[LibSass](http://sass-lang.com/libsass) is a C/C++ port of the Sass engine. The point is to be simple, faster, and easy to integrate.


### PostCSS

[Autoprefixer](https://github.com/postcss/autoprefixer) is installed by default. This way we make sure that all our CSS can be written prefix-free while the prefixes are added later on based on the supported browsers. You can add/remove supported browsers by changing the `browserlist` property in `config.json`.

[Stylelint](https://github.com/stylelint/stylelint) is used to enforce some kind of code style throughout the project. By default we have some default checks in `.stylelintrc`, you can alter them per project.


### ESLint
[ESLint](http://eslint.org/) is a tool that helps to detect errors and potential problems in your JavaScript code. By default we have some default checks in `.eslintrc`, you can alter them per project.


### Modernizr
[Modernizr](https://github.com/Modernizr/grunt-modernizr) is great for feature detection. During installation you can choose if you want to use modernizr in your project or not. By default the modernizr classes are prefixed with `modernizr-` eg.:

```css
/* You want to test for css-transitions */
.modernizr-css-transitions {}
.modernizr-no-css-transitions {}

/* Test if javascript is supported */
.modernizr-js {}
.modernizr-no-js {}
```

And in javascript:
```js
/* You want to test for css-transitions */
if (Modernizr.csstransitions) {}
```

The default prefix is configurable by changing the `modernizrCssPrefix` property in `config.json`.


### Other optional third party plugins/tools/frameworks
You can choose optional third party frameworks from the wizard, by default only `Blocss` is selected.

* [Blocss (‘Blocks’)](https://github.com/Blocss/blocss) is a small but powerfull css framework designed specially for serious developers.
* [Babel](https://babeljs.io/) to write ES2015 and compile to ES5


## Contributing
If you have any ideas or additions for this project please refer to the [contributing guide](CONTRIBUTING.md)
