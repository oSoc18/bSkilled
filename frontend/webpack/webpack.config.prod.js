const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.config.base.js');

module.exports = merge(base, {
  devtool: '#source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      'LOCATION': 'http//fixmeiamanurl.com',
      'NODE_ENV': 'production',
      'API': 'http://fixmeiamanapiurl.com'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
