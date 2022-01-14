const path = require("path");

const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./js/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: process.env.NODE_ENV || "development",
  plugins: [
    new CopyWebpackPlugin({ patterns: [path.resolve(__dirname, "static")] }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
      withTypeScript: true,
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm"],
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
