const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { distPath, srcPath } = require("./path");
const MiniCssExtractionPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin  = require("css-minimizer-webpack-plugin");

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
        }
      }
    }
  },
});
