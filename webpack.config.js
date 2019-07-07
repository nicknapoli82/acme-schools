const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'client', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
