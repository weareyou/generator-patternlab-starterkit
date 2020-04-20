import merge from 'webpack-merge';
import common from './webpack.common';

module.exports = merge(common, {
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
                  targets: {
                    esmodules: true,
                  },
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
