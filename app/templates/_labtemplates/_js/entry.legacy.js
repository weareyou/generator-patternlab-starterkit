import '@babel/polyfill';

// Import legacy polyfills not provided by babel-polyfill.
import 'svgxuse';
import 'element-closest/browser';
// import 'whatwg-fetch';

// Import the main entry file after the polyfills.
import './entry';
