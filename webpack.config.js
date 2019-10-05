var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "react",
  "faker",
  "lodash",
  "redux",
  "react-redux",
  "react-dom",
  "react-input-range",
  "redux-form",
  "redux-thunk"
];

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      { use: ["style-loader", "css-loader"], test: /\.css$/ }
    ]
  },
  // this will avoid index.js file to add all node-modules imported into the budle... in another terms, it checks if we already have that lib
  // added to our vendor file, and if yes, it doesn't add it to bundle.js no more.
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ["vendor", "manifest"] }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
