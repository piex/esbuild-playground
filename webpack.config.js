// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: ['react-hot-loader/patch', "./src/index.ts"],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js"
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test:/\.(png|jpe?g|gif|ttf|wasm|svg)$/i,
      use: ['file-loader']
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MonacoWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 9000
  }
}
