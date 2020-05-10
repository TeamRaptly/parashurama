const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  mode: nodeEnv,
  resolve: {
    extensions: ['.js', '.jsx']
    // alias: {
    //   'firebase-database': path.resolve(
    //     __dirname,
    //     '../functions/firebase-database'
    //   )
    // }
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, './node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
