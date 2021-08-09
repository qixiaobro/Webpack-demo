const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
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
          // 将 babel-loader 提速至少两倍。这会将转译的结果缓存到文件系统中。
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  mode: 'development',
};
