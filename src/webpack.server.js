const baseConfig = require('./webpack.config');
const path = require('path');

// Note that since this is for the server, it is important to
// set the target to node and set the libraryTarget to commonjs2
module.exports = Object.assign(
  {},
  {
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
    devtool: 'source-map'
  },
  baseConfig
);
