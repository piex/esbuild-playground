// @ts-check
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');

/**
 * @return {import('webpack').Configuration}
 */
module.exports = (env, { mode }) => {
  const isDevMode = mode === 'development';

  return {
    entry: './src/index.ts',
    devtool: isDevMode ? 'source-map' : false,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isDevMode ? 'main.js' : 'main.[contenthash:8].js'
    },
    module: {
      rules: [{
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              isDevMode && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        }],
      }, {
        test: /.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }, {
        test:/\.(png|jpe?g|gif|ttf|wasm|svg)$/i,
        use: ['file-loader'],
      }],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new MonacoWebpackPlugin(),
      new WebpackBar(),
      isDevMode && new webpack.HotModuleReplacementPlugin(),
      isDevMode && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      compress: true,
      port: 9000,
    },
  };
}
