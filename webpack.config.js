const join = require('path').join

const include = join(__dirname, 'build')

module.exports = {
  mode: 'production',
  entry: './build/index.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    'library': 'npm-package-boilerplace'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', include }
    ]
  }
}
