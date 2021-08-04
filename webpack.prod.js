const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'imgs/[name].[hash][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          "css-loader",   // 2. Turns css into commonjs
          "sass-loader"   // 1. Turns sass into css
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax
      //to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new HtmlWebpackPlugin({
        title: 'Custom template',
        // Load a custom template (lodash by default)
        template: './src/template.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      new CssMinimizerPlugin(),
    ],
  },
});