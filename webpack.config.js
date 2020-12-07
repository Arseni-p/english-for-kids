const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  "entry": ['./src/index.js'],
  "output": {
    path: path.join(__dirname, 'build'),
    publicPath: "./", "filename": "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        loader: 'file-loader',
        options: {
          name: '../[path][name].[ext]',
          context: './src/' 
        },
      },
      {
        test: /\.(?:mp3|wav)$/i,
        loader: 'file-loader',
        options: {
          name: '../[path][name].[ext]',
          context: './src/'
        },
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'ccs/styles.mini.css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/', to: 'assets/' },
      ],
    }),

  ]
};