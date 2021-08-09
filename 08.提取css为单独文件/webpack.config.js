const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// process.env.NODE_ENV = 'production'
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/buidt.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //替代style-loader,将js中的css提取为单独的文件
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      //对输出文件重命名
      filename: "css/index.css",
    }),
  ],

  mode: "development",
};