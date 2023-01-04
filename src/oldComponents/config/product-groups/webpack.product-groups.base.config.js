const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('../webpack-helpers');
const baseConfig = require('../webpack.react.base.config');

module.exports = merge(baseConfig, {
  entry: {
    'product-groups': '/frontend/react/module/product-groups/init.jsx'
  },
  output: {
    path: path.resolve(helpers.rootDir, 'dist/react/module/product-groups'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(helpers.rootDir, 'react/module/product-groups/components'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../product-groups/[name].css'
    })
  ]
});
