const path = require("path");
const { srcPath, publicPath } = require("./path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBarPlugin = require("webpackbar");
const HappyPack = require("happypack");

module.exports = {
  entry: {
    index: path.resolve(srcPath, "index.js"),
    second: path.resolve(srcPath, "second.js"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          // id 指向被 happypack 管理的 loader
          loader: "happypack/loader?id=happy-babel",
        },
        include: srcPath,
      },
    ],
  },
  plugins: [
    new WebpackBarPlugin({
      color: "#e58691",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, "index.html"),
      filename: "index.html",
      // 要引用的 js 代码
      chunks: ["index", "vendor", "common"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, "second.html"),
      filename: "second.html",
      chunks: ["second", "vendor"],
    }),
    // 使用 happypack 进行多进程打包
    new HappyPack({
      id: "happy-babel",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
          },
        },
      ],
    }),
  ],
};
