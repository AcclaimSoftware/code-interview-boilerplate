/* eslint-disable indent */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const sourcePath = path.join(__dirname, "./src");
const distPath = path.join(__dirname, "./dist");

module.exports = (env = {}) => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "src/index.html"),
    filename: "index.html",
    inject: "body",
  });

  return {
    context: sourcePath,

    entry: [sourcePath],

    output: {
      path: distPath,
      chunkFilename: "[name].js",
      filename: "[name].js",
      publicPath: env.public_path,
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // Split vendor code to its own chunk(s)
          vendors: {
            test: /[\\/]node_modules[\\/]/i,
            chunks: "all",
          },
        },
      },
      // The runtime should be in its own chunk
      runtimeChunk: {
        name: "runtime",
      },
    },

    plugins: [new webpack.HotModuleReplacementPlugin(), htmlWebpackPlugin],

    resolve: {
      alias: {
        "react-cssmodules": path.join(
          __dirname,
          "src/helpers/reactCssModules.js"
        ),
      },
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]__[hash:base64:5]",
                importLoaders: 1,
              },
            },
            {
              loader: "resolve-url-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sourceMapContents: false,
              },
            },
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf)$/,
          loader: "url-loader?limit=100000",
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true, // true outputs JSX tags
              },
            },
          ],
        },
      ],
    },

    devtool: "cheap-module-eval-source-map",

    devServer: {
      host: "localhost",
      contentBase: sourcePath,
      compress: true,
      port: 8090,
      historyApiFallback: true,
      hot: true,
    },
  };
};
