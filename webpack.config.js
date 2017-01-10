const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    index: './src/'
  },

  output: {
    path: './',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },

  devtool: 'source-map'
}
