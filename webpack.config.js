/* eslint-disable no-undef */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // {
      //     test: /\.html$/,
      //     loader: 'file-loader',
      //     options: {
      //         name: '[name].[ext]',
      //     },
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/favicon.ico', to: 'favicon.ico' },
        { from: 'public/logo192.png', to: 'logo192.png' },
        { from: 'src/assets', to: 'assets' }
      ]
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html' // Output filename
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Specify file extensions to resolve
    alias: {
      '@mui': path.resolve(__dirname, 'node_modules', '@mui')
    }
  }
};
