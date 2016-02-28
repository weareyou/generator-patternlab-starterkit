# generator-patternlab-starterkit - v1.0.0

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Sass, Autoprefixer, Bower, Grunt) and front-end dependencies (Angular, jQuery, Modernizr, [Blocss](https://github.com/Blocss/blocss) etc.).

## Prerequisites
Make sure Node and npm are installed. A great guide can be found here: [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

- Install Yeoman, Bower `npm install -g yo bower` (one-time global install) or update: `npm update -g yo bower`.
- Install this generator with `npm install -g generator-patternlab-starterkit` (one-time global install) or update: `npm update -g generator-patternlab-starterkit`.

*Note*: Mac users need to run above commands with sudo.

## Installation
- From the terminal, navigate to your site's directory.
- Type `yo patternlab-starterkit`, answer a few questions about your project, and wait.
- Bask in the glory of your fully scaffolded patternlab installation.


## Getting Started
### Front-end developing
Run `grunt serve` from the commandline. This creates all patterns, the styleguide, and the pattern lab site by BrowserSync which serve the files to you.

### Deployments
For a single compile of all code, to build on a server for example, you can run `grunt`. This will compile the front-end one single time.
