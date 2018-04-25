//这里引入path是为了解析相对路径，配置文件某些路径要求是绝对路径
const path = require('path');
//简化生成适合webpack打包的html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css/js in html
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
// 合并配置文件
const Merge = require('webpack-merge');

// npm_lifecycle_event：  npm提供的运行的脚本的名称的变量
// npm install --save-dev cross-env    可以用这个包来跨平台设置环境变量
const TARGET = process.env.npm_lifecycle_event

let config

if (TARGET === 'build') {
  config = require('./webpack.prod.conf.js')
}
else if (TARGET === 'start') {
  config = require('./webpack.dev.conf.js')
}

module.exports = Merge(config, {
  entry: [
    // webpack的入口文件，注意这个声明必须写在上面两个后面，webpack-dev-server才有效
    './app.js'
  ],
  output: {
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].map',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      // 处理.png和.jpg格式的图片文件
      test: /\.(jpg|png)$/,
      // limit参数指图片大小（10kb），当小于这个值时图片转为base64，当把值修改为60000时，1.jpg（50kb）会被解析成base64，打包后查看index.html代码可以看到
      // name参数指图片文件的命名格式，前面可以加 img/ 表示图片存储路径
      use: ['url-loader?limit=10000&name=img/[name].[ext]'
      ]
    }, {
      // 处理.html文件
      test: /\.html$/,
      use: ['html-loader']
    }]
  },
  // webpack插件
  plugins: [
    // 生成html文件
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      inlineSource: '.(css)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
});