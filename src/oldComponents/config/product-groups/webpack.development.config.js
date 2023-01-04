const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.product-groups.base.config');

module.exports = merge(baseConfig, {
  devtool: 'eval',
  mode: 'development',
  output: {
    pathinfo: true
  },
  watch: true
});
