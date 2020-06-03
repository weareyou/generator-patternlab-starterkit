/**
 * Import conditioner
 * As per: https://pqina.nl/conditioner/
 */
import * as conditioner from 'conditioner-core';

/* prettier-ignore */

/**
 * Configure conditioner to work with dynamic imports & webpack
 */
conditioner.addPlugin({
  // converts module aliases to paths
  moduleSetName: (name) => `${name}.js`,
  // get the module constructor
  moduleGetConstructor: (module) => module.default,
  // override the import
  moduleImport: (name) => import(
    /* https://webpack.js.org/api/module-methods/#import- */
    /* set to "eager" to create a single chunk for all modules */
    /* set to "lazy" to create a separate chunk for each module */
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '../modules/' + name // eslint-disable-line
  ),
});

/**
 * Fire up the modules!
 */
conditioner.hydrate(document.documentElement);
