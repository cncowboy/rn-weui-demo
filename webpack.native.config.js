/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 * path.join(__dirname, 'src/components/native/rn_weui/src')
 */

'use strict'

var makeConfig = platform => {

  var path = require('path')
  var IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");

  var config = {
    debug: true,
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['', '.js', '.' + platform + '.js', '.' + platform + '.jsx' ],
      alias:{
        'react-weui': 'rn-weui'
      }
    },
    entry: {},
    plugins: [
      new IsomorphicLoaderPlugin({'keepExistingConfig': true})
    ],
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx|es6)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'eslint-loader',
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          include: /node_modules\/react-native/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-1', 'react']
          }
        },
        {
          test: /\.(js|jsx|es6)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-1', 'react']
          },
          plugins: ["syntax-async-functions", "transform-regenerator"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
          loader: 'url-loader?importLoaders=1&limit=10000&name=fonts/[hash:8].[name].[ext]'
        },
        {
          'test': /\.(jpe?g|png|gif|svg)$/i,
          "loader": "rn-image"
        }
      ]
    }
  }
  config.entry['index.' + platform] = ['./index.' + platform + '.js'];
  return config;
}

var configs = [];
if (process.argv.indexOf('--no-ios') === -1) {
    configs.push(makeConfig('ios'));
}
if (process.argv.indexOf('--no-android') === -1) {
    configs.push(makeConfig('android'));
}
module.exports = configs;

