# generator-patternlab-starterkit - v1.1.1

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Sass, Autoprefixer, Bower, Grunt) and front-end dependencies (Angular, jQuery, Modernizr, [Blocss](https://github.com/Blocss/blocss) etc.).


<a name="prerequisites"></a>
## Prerequisites
Make sure Node and npm are installed. A great guide can be found here: [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

- Install Yeoman, Bower `npm install -g yo bower` (one-time global install) or update: `npm update -g yo bower`.
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
Run `grunt serve` from the commandline. This creates all patterns, the styleguide, and the pattern lab site by BrowserSync which serve the files to you.


### Deployments
For a single compile of all code, to build on a server for example, you can run `grunt`. This will compile the front-end one single time.

## Featureset
In general refer to [patternlab-node](https://github.com/pattern-lab/patternlab-node) for more in depth documentation about the use of patternlab.
generator-patternlab-starterkit has some important additions compared to patternlab-node:

### Multiple data files
Out of the box patternlab only loads `data.json` for data binding. This has a few limitations:

* In big projects the file gets huge very fast
* Constant merge conflicts when working in multiple branches

The patternlab starterkit makes it possible to pull data out of multiple folders located in `your-site-public-folder/_data/partials`. Those files will still be combined into one `data.json` which in turn gets loaded into patternlab-node but will be excluded from git.

This setup allows us to apply atomic design to our data as well, and makes data inheritance a lot more easy.



## Contributing
If you have any ideas or additions for this project please refer to the [contributing guide](CONTRIBUTING.md)
