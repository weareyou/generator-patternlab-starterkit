import merge from 'webpack-merge';
import common from './webpack.common';

module.exports = merge(common, {
  watch: true,
  mode: 'development',
});
