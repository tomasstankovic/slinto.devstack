var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      loader: 'babel-loader'
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
          mangle: {
            keep_fnames: true
          }
        })
    ];
  })(),
  modulesDirectories: ['app/bower_components']
};
