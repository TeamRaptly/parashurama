// script to enable webpack-bundle-analyzer
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpackConfigClient = require('../webpack.client');
const webpackConfigServer = require('../webpack.server');

// Client bundle
webpackConfigClient.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerPort: 9999
  })
);

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigClient, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});

// Server bundle
// webpackConfigServer.plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerPort: 9998
//   })
// );

// webpack(webpackConfigServer, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     console.error(err);
//   }
// });
