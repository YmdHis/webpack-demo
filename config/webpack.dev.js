const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 入口文件的打包名
    filename: 'static/js/main.js',
    // 自动清空上一次打包结果
    // 原理： 在打包前将 path 这个目录先清空
    // webpack4 需要使用插件 clean-webpack-pligin
    clean: true
  },
  // 开发服务器 webpack-dev-server
  devServer: {
    host: '127.0.0.1', // 启动服务器域名
    port: '3000', // 端口
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/i, // 只检测.css 文件
        use: [ // 执行顺序，从后往前
          'style-loader', // 将js中css通过创建style标签添加到html中
          'css-loader', // 将css资源编译成commonjs的模块到js中
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点：减少请求数量   缺点：图片的的体积会大一些
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          // 输出图片名称
          // [hash:10] hash名称只取10位
          // [name] 图片原名称
          filename: 'static/images/[name].[hash:10][ext][query]'
        }
      },
      {
        //webpack4 处理图片需要通过 file-loader 和 url-loader
        // webpack5 将这两个loader内置了
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          // 输出名称
          // [hash:10] hash名称只取10位
          // [name] 原名称
          filename: 'static/fonts/[name].[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 不处理
        loader: 'babel-loader',
        // options 可写在 babel.config.js
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ]
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 指定检测的根目录
      context: path.resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      // 模版：以public/index.html文件创建新的html文件
      // 新的Html文件特点：1、结构和原来一致；2、自动引入打包输出的资源
      template: path.resolve(__dirname, '../public/index.html')
    })
  ],
  // 模式
  mode: 'development'
}