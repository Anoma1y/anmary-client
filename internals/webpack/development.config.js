const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = require('./base.config')({
  devtool: 'eval-source-map',
  mode: 'development',
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/index.js') // Start with js/app.js
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html'
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false // show a warning when there is a circular dependency
    })
  ],
  babel: {
    presets: [
      ['env', { modules: false }],
      'stage-1',
      'stage-3',
      'react',
    ],
    plugins: [
      'transform-runtime',
      'transform-decorators-legacy'
    ]
  },
  devserver: {
    hot: true,
    inline: true,
    overlay: false,
    quiet: false,
    historyApiFallback: true,
    contentBase: path.resolve(process.cwd() + '/public'),
    watchContentBase: true
  },
  performance: {
    hints: false
  }
});
