const HtmlWebPackPlugin = require("html-webpack-plugin");
const config = require('../config/config');
const resolve = require('./utils').resolve;

module.exports = {
  entry: {
    index: resolve('src/entry/index.js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&limit=8192&name=assets/[name].[hash:8].[ext]'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?prefix=fonts/name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?prefix=fonts/&name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=font/opentype'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: config.title,
      template: resolve('src/index.html'),
      hash: false
    })
  ],
  resolve: {
    alias: config.alias
  }
};