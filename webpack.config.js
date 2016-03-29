// http://survivejs.com/webpack_react/developing_with_webpack/#setting-up-webpack-configuration

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        // NB: loaders evaluated from right to left
        loaders: ['style', 'css'],
        include: PATHS.app
      }
    ]
  }
}

if (TARGET === 'start' || !TARGET) {
  // http://survivejs.com/webpack_react/developing_with_webpack/#configuring-hot-module-replacement-hmr-
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce output
      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
