const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve("lib"),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  externals: ["react"],
};
