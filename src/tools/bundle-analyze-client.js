// script to enable webpack-bundle-analyzer
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpackConfigClient = require('../webpack.client');

// Client bundle
webpackConfigClient.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerPort: 9999,
    openAnalyzer: true
  })
);

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigClient, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
