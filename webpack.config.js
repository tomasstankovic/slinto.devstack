var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [{
      loader: "babel-loader",
      include: [
        path.resolve(__dirname, "client/js/")
      ],
      test: /\.js?$/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015']
      }
    }]
  },
  devtool: "source-map",
  output: {
    filename: 'build.js'
  },
  plugins: (function() {
    return [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          keep_fnames: true,
          screw_ie8: true,
          warnings: false
        },
        comments: false,
        mangle: {
          keep_fnames: true
        }
      })
    ];
  })(),
  modulesDirectories: ['app/bower_components']
};
