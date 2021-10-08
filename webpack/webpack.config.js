const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: {
    polyfills: './src/polyfills',
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'import-loader?wrapper=window',
      },
      {
        test: require.resolve('./src/globals.js'),
        use:
          'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    })
  ]
};