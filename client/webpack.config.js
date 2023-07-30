const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebPackPlugin({
      title: "Development",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    //rules array is executed in reverse order
    rules: [
      {
        //? matches the preceding item 0 or 1 times (could be .js or .jsx)
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      {
        test: /\.css$/i,
        use: [
          // creates 'style' nodes from JS strings
          "style-loader",
          // compiles CSS to commonJS
          "css-loader",
        ],
      },
      // handle images using file-loader - source: https://v4.webpack.js.org/loaders/file-loader/
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
};
