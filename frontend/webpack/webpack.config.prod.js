const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.config.base.js');

module.exports = merge(base, {
  devtool: '#source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      'LOCATION': 'https://bskilled.today/',
      'NODE_ENV': 'production',
      'API': 'https://api.larmuseau.org/api/'
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
