const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  mode: "development",
  entry: "./src/js/clientApp.tsx",
  module: {
    rules: [
      {
        test: /\.(jsx?$)|(tsx?$)/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
      }
    ]
  },
  plugins: [new WebpackNotifierPlugin({ alwaysNotify: true })],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
