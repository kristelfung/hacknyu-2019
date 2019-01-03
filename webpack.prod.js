const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CopyWebpackPlugin([
      { from: "dist/dev/css", to: "css" },
      { from: "dist/dev/img", to: "img" },
      { from: "dist/dev/index.html", to: "index.html" }
    ])
  ],
  output: {
    path: path.resolve(__dirname, "dist/prod"),
    filename: "build.js"
  }
});
