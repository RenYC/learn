const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    static: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '/dist'),
  }
}