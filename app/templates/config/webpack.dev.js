const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  watch: true,
  mode: 'development',
});
