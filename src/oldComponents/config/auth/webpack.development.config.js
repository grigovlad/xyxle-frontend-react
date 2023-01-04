const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.auth.base.config');

module.exports = merge(baseConfig, {
  devtool: 'eval',
  mode: 'development',
  output: {
    pathinfo: true
  },
  watch: true
});
