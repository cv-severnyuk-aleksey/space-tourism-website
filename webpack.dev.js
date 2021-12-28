const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env.development')
} );

const generateHtmlPlugins = () => {
  const nameFiles = ['index', 'destination', 'crew', 'technology'];
  return nameFiles.map(name => {
    return new HtmlWebpackPlugin({
      inject: false,
      filename: `${name}.html`,
      template: './src/index.html',
      prefix: process.env.SITE_PREFIX,
    })
  })
};

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ]
  .concat(generateHtmlPlugins()),

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    open: true,
  }
});