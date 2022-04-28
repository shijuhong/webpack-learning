const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const { distPath, srcPath, publicPath } = require("./path");

module.exports = merge(webpackCommon, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
    ],
  },
  devServer: {
    // 是否压缩
    compress: true,
    // 启动后是否自动打开页面
    open: true,
    port: 9000,
  },
});
