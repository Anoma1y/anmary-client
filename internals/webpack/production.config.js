const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./base.config')({
  entry: [
    path.join(process.cwd(), 'app/index.js')
  ],

  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        remoteEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true
    })
  ],
  babel: {
      presets: [
          ['env', { modules: false }],
          'stage-1',
          'stage-3',
          'react',
      ],
      only: ['app'],
      plugins: [
          'transform-flow-strip-types',
          'transform-react-remove-prop-types',
          'transform-react-constant-elements',
          'transform-decorators-legacy',
          'transform-runtime',
      ]
  },
  devserver: {}
});
