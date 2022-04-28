const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { distPath, srcPath } = require("./path");
const MiniCssExtractionPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { IgnorePlugin } = require("webpack");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = merge(webpackCommon, {
  mode: "production",
  output: {
    path: distPath,
    // 多文件产出时，名称需要设置变量，变量值为入口的 key 值
    filename: "[name].[contenthash:8].js",
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractionPlugin.loader, "css-loader", "postcss-loader"],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractionPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractionPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 16 * 1024,
              outputPath: "/imgs/",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractionPlugin({
      filename: "css/main.[contenthash:8].css",
    }),
    // 避免引入 moment 所有内容
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          // drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
      },
    }),
  ],
  optimization: {
    minimize: true,
    // 压缩 js 和 css 代码
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    // 分割代码块
    splitChunks: {
      chunks: "all",
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: "vendor",
          priority: 1, // 值越高，优先级越高
          test: /node_modules/,
          minSize: 0, // 文件太小就不抽离
          minChunks: 1, // 复用一次就抽离
        },
        // 自己写的公共模块抽离
        common: {
          name: "common",
          priority: 0,
          minSize: 0,
          minChunks: 2, // 复用两次就抽离
        },
      },
    },
  },
});
