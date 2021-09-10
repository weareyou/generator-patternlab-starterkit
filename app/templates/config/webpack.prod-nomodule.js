const { merge } = require('webpack-merge');
const common = require('./webpack.config');
const config = require('../patternlab-config.json');

module.exports = merge(common, {
  mode: 'production',
  entry: `${config.paths.assets.js}entry.legacy.js`,
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
            ],
          },
        },
      },
    ],
  },
});
