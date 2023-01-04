const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('../webpack-helpers');
const baseConfig = require('../webpack.react.base.config');

module.exports = merge(baseConfig, {
  entry: {
    'admin-permissions': '/frontend/react/module/admin-permissions/init.jsx'
  },
  output: {
    path: path.resolve(helpers.rootDir, 'dist/react/module/admin-permissions'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(helpers.rootDir, 'react/module/admin-permissions/components'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../admin-permissions/[name].css'
    })
  ]
});
