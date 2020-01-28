import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';


import COMMON_VENDORS from './common-vendors';

const COMMON_REGEX = `[\\\\/]node_modules[\\\\/](${COMMON_VENDORS.join('|')})[\\\\/]`;

const config = {
  entry: path.resolve(__dirname, '../client/index.js'),
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: '/'
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
      test: /\.(le|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
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
      use: 'html-loader'
    }, {
      type: 'javascript/auto',
      exclude: /(node_modules)/,
      test: /\.json?$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
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
    },
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

export default config;
