/**
 * TODO:
 * 1.css处理、兼容性处理、提取
 * 2.less处理、兼容性处理、提取
 * 3.css压缩
 * 4.js语法校验
 * 5.js兼容性处理
 * 6.js压缩
 * 7.html压缩
 * 8.图片处理、压缩、文件名处理
 * 9.html中的图片处理
 * 10.其它文件处理 压缩、文件名处理
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const commomCssLoader = [
  // 替代style-loader,将js中的css提取为单独的文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  // 使用postcss-loader 处理css兼容性
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              // 其他选项
            },
          ],
        ],
      },
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commomCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commomCssLoader, 'less-loader'],
      },
      {
        // 还需要配置browserslist
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
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
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'assets/imgs',
        },
      },
      {
        test: /\.(html)$/,
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
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'assets/other',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    // 需配置eslintConfig
    new EslintWebpackPlugin({
      // eslint 语法检查
      extensions: 'js',
      exclude: 'node_modules',
      fix: true,
    }),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    minimize: true,
  },
  mode: 'production',
};
