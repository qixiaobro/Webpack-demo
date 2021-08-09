const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        // less资源
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        // css资源
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // 图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'assets/imgs',
        },
      },
      {
        // 可以处理html中的img图片，可负责将其中的图片引入，然后交由url-loader进行解析
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      {
        // 其它资源
        exclude: /\.(jpg|png|gif|html|css|less|js)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'assets/other',
        },
      },
      /**
       * js语法兼容性处理：babel-loader @babel/core
       *  1.基本js语法兼容性处理：@babel/preset-env 问题：promise等不能转换
       *  2.全部js语法兼容性处理：@babel/polyfill 问题：将所有兼容性代码引入，导致代码体积太大
       *  3.按需加载：core-js
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 指定按需加载
                useBuiltIns: 'usage',
                // 指定core-js的版本
                corejs: {
                  version: 3,
                },
                // 指定兼容的浏览器版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      // 对输出文件重命名
      filename: 'css/index.[contenthash:10].css',
    }),
  ],

  mode: 'development',
};
