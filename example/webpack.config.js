require('webpack')
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    example: ['./example.ts']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader'
      },
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].js'
  }
}
