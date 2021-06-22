const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');
const config = require('../config/config');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: config.theme
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin()
  ],
  devServer: {
    port: config.dev.port,
    contentBase: path.join(__dirname, '..'),
    compress: true,
    historyApiFallback: true,
    open: config.dev.autoOpenBrowser,
    hot: true,
    https: config.dev.https,
    stats: {
      all: false,
      modules: false,
      maxModules: 0,
      errors: true,
      warnings: false,
      assets: true,
      builtAt: true,
      version: true,
      timings: true
    },
    proxy: config.dev.proxy,
    host: config.dev.host,
    public: 'http://localhost:' + config.dev.port
  }
});
