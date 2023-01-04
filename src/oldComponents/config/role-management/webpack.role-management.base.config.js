const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('../webpack-helpers');
const baseConfig = require('../webpack.react.base.config');

module.exports = merge(baseConfig, {
  entry: {
    'role-management': '/frontend/react/module/role-management/init.jsx'
  },
  output: {
    path: path.resolve(helpers.rootDir, 'dist/react/module/role-management'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(helpers.rootDir, 'react/module/role-management/components'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../role-management/[name].css'
    })
  ]
});
