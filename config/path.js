const path = require("path");
const basePath = path.resolve(__dirname, "..");
const srcPath = path.resolve(__dirname, "..", "src");
const distPath = path.resolve(__dirname, "..", "dist");
const publicPath = path.resolve(__dirname, "..", "public");

module.exports = {
  basePath: basePath,
  srcPath: srcPath,
  distPath: distPath,
  publicPath: publicPath,
};
