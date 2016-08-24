// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: './build/js'
  },
  resolve: [
    path.resolve('./src'),
    path.resolve('./node_modules')
  ],
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: 'handlebars!markdown'
      }
    ]
  }
};
