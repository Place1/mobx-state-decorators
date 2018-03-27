const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          "node_modules/",
        ],
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    port: 3000,
  },
}
