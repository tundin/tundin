// http://survivejs.com/webpack_react/developing_with_webpack/#setting-up-webpack-configuration

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  static: path.join(__dirname, 'static')
};

process.env.BABEL_ENV = TARGET

const common = {
  entry: {
    app: PATHS.app
  },
  // http://survivejs.com/webpack_react/webpack_and_react/#configuring-babel-loader-
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000',
        include: PATHS.static
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react',
        include: PATHS.static
      },
      {
        test: /\.css$/,
        // NB: loaders evaluated from right to left and bottom to top
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
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
