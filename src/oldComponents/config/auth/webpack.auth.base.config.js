const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('../webpack-helpers');
const baseConfig = require('../webpack.react.base.config');

module.exports = merge(baseConfig, {
  entry: {
    'auth': '/frontend/react/module/auth/init.jsx'
  },
  output: {
    path: path.resolve(helpers.rootDir, 'dist/react/module/auth'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(helpers.rootDir, 'react/module/auth/components'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../auth/[name].css'
    })
  ]
});
