const path = require("path");
const { srcPath, publicPath } = require("./path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
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
  ],
};
