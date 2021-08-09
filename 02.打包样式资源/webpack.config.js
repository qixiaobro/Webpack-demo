/**
 * webpack.config.js webpack的配置文件
 * 作用：指示webpack如何运行
 *
 * 所有构建工具都是基于node.js平台运行的～模块化默认采用common.js
 */

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },

  // loader的配置
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次进行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },

  // plugins的配置
  plugins: [],

  // 模式
  mode: 'production',
};
