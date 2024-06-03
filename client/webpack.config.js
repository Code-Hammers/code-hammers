const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  watchOptions: {
    poll: 1000,
  },
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    //REQUIRED FOR DOCKER
    host: '0.0.0.0',
    port: 8080,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/app/,
          to: '/index.html',
        },
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },

      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
