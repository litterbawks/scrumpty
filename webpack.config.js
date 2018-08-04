var webpack = require('webpack')

module.exports = {
  entry: __dirname+`\\client\\src\\index.jsx`,
  output: {
    filename: 'bundle.js',
    path: __dirname+'\\client\\dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: __dirname+'\\client\\src',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
};