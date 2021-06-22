const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const config = require('../config/config');
const resolve = require('./utils').resolve;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 替换插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
 
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
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
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[name].[hash:8].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "WEB-INF",
        to: "WEB-INF",
        toType: "dir"
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: config.build.theme
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({  // 将 UglifyJsPlugin 改为 TerserWebpackPlugin
        parallel: 4, // 该配置项改为数字，行内 peset 部署时由于环境限制最大为 20
        cache: true,
        terserOptions: {  // 将 uglifyOptions 改为 terserOptions
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
          },
          output: {
            beautify: false,
            comments: false,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 100,
          name: 'common',
        }
      }
    }
  }
})
 
 
 
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
 
module.exports = webpackConfig