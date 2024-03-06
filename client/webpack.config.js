const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
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
  ],
  devServer: {
    proxy: [{ '/api': 'http://localhost:3000' }],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: /^\/app/,
    //       to: "/index.html",
    //     },
    //   ],
    // },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
