module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
    // alias: {
    //   'firebase-database': path.resolve(
    //     __dirname,
    //     '../functions/firebase-database'
    //   )
    // }
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
  }
};
