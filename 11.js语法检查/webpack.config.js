const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ESLintPlugin({
      /**
       * 语法检查：
       * 需安装eslint eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import
       * 只检查自己写的js源代码、需排查node_modules
       * 在package.json中的eslintConfig中设置
       */
      extensions: 'js',
      exclude: 'node_modules',
      fix: true,
    }),
  ],

  mode: 'development',
};
