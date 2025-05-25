const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/script.js', // основной JS-файл
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // очищать dist перед сборкой
  },
  module: {
    rules: [
      {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      }
    ],
  },

plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: 'style.css',
  }),
  new CopyPlugin({
    patterns: [
      { from: 'src/assets', to: 'assets' },
    ],
  }),
],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  mode: 'development', // поменяй на 'production' при финальной сборке
};
