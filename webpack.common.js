const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default)
      template: './src/template.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader",   // 2. Turns css into commonjs
          "sass-loader"   // 1. Turns sass into css
        ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: "asset/resource",
        // use: {
        //   loader: "file-loader",
        //   options: {
        //     name: "[name].[contenthash].[ext]",
        //     outputPath: "imgs"
        //   }
        // }
      }
    ]
  }
}