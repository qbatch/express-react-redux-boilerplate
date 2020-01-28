import 'dotenv/config';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

import COMMON_VENDORS from './common-vendors';

const COMMON_REGEX = `[\\\\/]node_modules[\\\\/](${COMMON_VENDORS.join('|')})[\\\\/]`;

const { SERVER_PORT, CLIENT_PORT } = process.env;

const config = {
  entry: path.resolve(__dirname, '../client/index.js'),
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    pathinfo: false
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    }, {
      test: /\.jsx?$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack']
    }, {
      test: /\.(le|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development'
          }
        },
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.(png|gif|jpe?g|svg|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, {
      type: 'javascript/auto',
      exclude: /(node_modules)/,
      test: /\.json?$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(COMMON_REGEX),
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    port: CLIENT_PORT,
    proxy: {
      '/api': `http://localhost:${SERVER_PORT}`,
    },
    hot: true,
    historyApiFallback: true
  },
};

export default config;
