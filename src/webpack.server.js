const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

// Note that since this is for the server, it is important to
// set the target to node and set the libraryTarget to commonjs2
const serverConfig = {
  mode: nodeEnv,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  target: 'node',
  entry: {
    server: './containers/ServerApp.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['dynamic-import-node', 'remove-webpack']
        }
      },
      {
        // Should be after babel-loader
        test: /\.(js|jsx)$/,
        loader: 'stylelint-custom-processor-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};

// https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
// Having single server compiled file and turn off code splitting for server

module.exports = serverConfig;
