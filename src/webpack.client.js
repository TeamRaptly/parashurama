const path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

console.log('client webpack env...', nodeEnv);
console.log('client webpack isProduction...', isProduction);

const clientConfig = {
  ...baseConfig,
  ...{
    mode: nodeEnv,
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: {
      client: './containers/ClientApp.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public/assets'),
      // https://github.com/gregberge/loadable-components/issues/348
      // https://github.com/webpack/webpack/issues/443#issuecomment-54113862
      // https://webpack.js.org/guides/public-path/
      // to request client bundles with correct exposed public path
      // should match with express static pulbic path
      publicPath: '/assets/'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          reactmaterial: {
            test: /[\\/]node_modules[\\/](react|react-dom|@material-ui)[\\/]/,
            name: 'react-material',
            chunks: 'all',
            priority: 30
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 20
          },
          // https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    plugins: [
      // Force imports of packages like @material-ui/core to use the /es versions
      new webpack.NormalModuleReplacementPlugin(
        /^@material-ui\/core(\/|$)/,
        (resource) => {
          resource.request = resource.request.replace(
            /^(@[^/+]+\/[^/+]+|[^/+]+)(?:\/esm)?(\/.*)?$/,
            '$1/esm$2'
          );
        }
      )
    ]
  }
};

module.exports = clientConfig;
