const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');
const helpers = require('./webpack-helpers');

module.exports = {
  entry: {
    '../../theme': path.resolve(helpers.rootDir, 'react/theme/theme.scss')
  },
  output: {
    filename: '[name].js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@constant': path.resolve(helpers.rootDir, 'react/constant'),
      '@resources': path.resolve(helpers.rootDir, 'react/resources'),
      '@store': path.resolve(helpers.rootDir, 'react/resources/state/store'),
      '@saga': path.resolve(helpers.rootDir, 'react/resources/state/saga'),
      '@shared-components': path.resolve(helpers.rootDir, 'react/shared-components'),
      '@theme': path.resolve(helpers.rootDir, 'react/theme'),
      '@assets': path.resolve(helpers.rootDir, 'react/assets')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false
      })],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: "production"
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [{
                  autoprefixer: {browsers: ['last 3 versions', 'last 8 Chrome versions', 'last 8 Firefox versions', 'ie >= 9', 'last 2 iOS major versions', 'Android >= 4']}
                }]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100000,
              name : 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
