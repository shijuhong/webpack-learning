const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { distPath, srcPath } = require("./path");
const MiniCssExtractionPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
  },
});
