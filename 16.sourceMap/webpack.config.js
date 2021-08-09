const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  target: 'web',
  module: {
    rules: [
      {
        oneOf: [
          {
            // less资源
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
          },
          {
            // css资源
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
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
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  mode: 'development',

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启热更新
    hot: true,
  },

  devtool: 'source-map',
};
