const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('../patternlab-config.json');

module.exports = merge(common, {
  entry: `${config.paths.assets.js}entry.legacy.js`,
  output: {
    filename: 'bundle.es5.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});
