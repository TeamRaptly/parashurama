const baseConfig = require('./webpack.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

// Note that since this is for the server, it is important to
// set the target to node and set the libraryTarget to commonjs2
const serverConfig = {
  ...baseConfig,
  ...{
    mode: nodeEnv,
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    target: 'node',
    entry: {
      server: './containers/ServerApp.js',
      // Remove components from route config
      // and make the component dynamically loaded with page bundles
      routes: './route-config/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../functions/build'),
      libraryTarget: 'commonjs2'
    },
    externals: [
      nodeExternals({
        modulesDir: ['../functions/node_modules/']
      })
    ],
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      })
    ]
  }
};

module.exports = serverConfig;
