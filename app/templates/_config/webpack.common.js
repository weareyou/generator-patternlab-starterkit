import { resolve } from 'path';
import config from '../config';

module.exports = {
  mode: 'production',
  entry: `${config.paths.source.js}entry.js`,
  devtool: 'source-map',
  output: {
    path: resolve(config.paths.public.js),
    filename: 'bundle.es6.js',
  },
};
