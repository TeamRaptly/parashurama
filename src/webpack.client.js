const path = require('path');
const webpack = require('webpack');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

const clientConfig = {
  mode: nodeEnv,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: {
    client: './containers/ClientApp.js',
    sw: './service-worker/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Should be after babel-loader
        test: /\.js$/,
        loader: 'stylelint-custom-processor-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    // https://github.com/gregberge/loadable-components/issues/348
    // https://github.com/webpack/webpack/issues/443#issuecomment-54113862
    // https://webpack.js.org/guides/public-path/
    // to request client bundles with correct exposed public path
    // should match with express static pulbic path
    publicPath: '/'
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'service-worker', 'manifest.json')
        },
        { from: path.resolve(__dirname, 'assets'), to: 'assets' }
      ]
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/_features'],
          crawlDelay: 2
        },
        {
          userAgent: 'OtherBot',
          allow: ['/', '/about'],
          disallow: ['/_features'],
          crawlDelay: 2
        },
        {
          userAgent: '*',
          allow: '/',
          // disallow: '/search',
          crawlDelay: 10
          // cleanParam: 'ref /articles/'
        }
      ]
      // sitemap: 'http://example.com/sitemap.xml',
      // host: 'http://example.com'
    }),
    // Force imports of packages like @material-ui/core to use the /es versions
    new webpack.NormalModuleReplacementPlugin(
      /^@material-ui\/core(\/|$)/,
      (resource) => {
        // eslint-disable-next-line no-param-reassign
        resource.request = resource.request.replace(
          /^(@[^/+]+\/[^/+]+|[^/+]+)(?:\/esm)?(\/.*)?$/,
          '$1/esm$2'
        );
      }
    )
  ]
};

module.exports = clientConfig;
