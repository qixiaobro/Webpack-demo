

const {resolve} = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  externals:'jquery',

  module: {
    rules: [
      {
        test: /\.less$/,
        //使用多个处理用use
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        //问题：默认处理不了html中的img图片
        //处理图片资源
        test: /\.(jpg|png|gif)$/,
        //使用一个loader
        //下载两个loader file-loader url-loader,url-loader依赖于file-loader
        loader: "url-loader",
        options: {
          //图片大小小于8kb，base64处理
          //优点：减小请求数量
          //缺点：图片体积会更大（减慢加载速度）
          limit: 8 * 1024,
          //给图片重新命名
          //[hash:10]:去图片hash的前10位
          //[ext]取图片原来的扩展名
          name: "[hash:10].[ext]",
        },
      },
      {
        //可以处理html中的img图片，可负责将其中的图片引入，然后交由url-loader进行解析
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  mode: "none",
};