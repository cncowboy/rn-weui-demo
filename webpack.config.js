'use strict'
var path = require('path')
var WebPack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var HtmlWebPackTemplate = require('html-webpack-template');

var NODE_ENV = process.env.NODE_ENV || 'development';
var isDevelopment = NODE_ENV === 'development';

var Config = new WebPack.NormalModuleReplacementPlugin(
    /^config$/,
    __dirname + '/config.js'
);

module.exports = {
    output: {
        filename: '[name].[hash].js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    cache: true,
    debug: true,
    devtool: false,
    entry: {
        app: __dirname + '/index.web.js'
    },
    stats: {
        colors: true,
        reasons: true
    },
    plugins: [
        Config,
        new HtmlWebPackPlugin({
            template: HtmlWebPackTemplate,
            inject: false,

            title: 'Ride App',
            favicon: __dirname + '/static/favicon.ico',
            filename: 'index.html',
            appMountId: 'app',
            mobile: true
        })
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
          }
        }
      ]
    }
};

