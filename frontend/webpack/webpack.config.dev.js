const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.config.base.js');

module.exports = merge(base, {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      'LOCATION': 'http://localhost:8080/',
      'NODE_ENV': 'development',
      'API': 'http://localhost:8081/api/'
    })
  ]
})
