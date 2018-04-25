// 这里引入是为了插件使用
const webpack = require('webpack')
//抽取css字符串并生成css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 清理生成文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      // 抽离到css文件
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true  // 压缩css
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer({
              browsers: ['last 2 versions']
            })]
          }
        }, 'sass-loader']
      })
    }]
  },
  // webpack插件
  plugins: [
    // 生成css文件，以下括号中的'style.css' 是打包后的css文件名，可自定义
    new ExtractTextPlugin("[name].[chunkhash].css"),
    // 清除生成文件夹
    new CleanWebpackPlugin('dist'),
    // JS压缩
    new webpack.optimize.UglifyJsPlugin()
  ]
}