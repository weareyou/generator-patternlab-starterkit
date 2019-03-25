import merge from 'webpack-merge';
import common from './webpack.common';
import config from '../config';

module.exports = merge(common, {
  entry: `${config.paths.source.js}entry.legacy.js`,
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
