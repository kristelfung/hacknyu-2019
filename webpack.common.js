module.exports = {
  mode: "development",
  entry: "./src/js/clientApp.jsx",
  module: {
    rules: [
      {
        test: /\.(jsx?$)|(tsx?$)/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
