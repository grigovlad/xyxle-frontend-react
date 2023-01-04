const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('../webpack-helpers');
const baseConfig = require('../webpack.react.base.config');

module.exports = merge(baseConfig, {
  entry: {
    'api-keys': '/frontend/react/module/api-keys/init.jsx'
  },
  output: {
    path: path.resolve(helpers.rootDir, 'dist/react/module/api-keys'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(helpers.rootDir, 'react/module/api-keys/components'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../api-keys/[name].css'
    })
  ]
});
