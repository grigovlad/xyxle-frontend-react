const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.admin-permissions.base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
