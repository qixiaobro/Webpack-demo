
const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        exclude: /\.(svg|js|jsx|ts|tsx|html|css)$/,
        loader: "file-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  mode: "development",

  //开发服务器，用来自动化编译、自动打开浏览器、自动刷新
  //特点：只会在内存中编译，不会有输出。
  //启动dev-server命令：npx webpack server,首先要先安装 webpack-dev-server
  devServer: {
    //告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
    contentBase: resolve(__dirname, "build"),
    //为每个静态文件开启gzip压缩
    compress: true,
    port: 3000,
    open: true,
  },
};