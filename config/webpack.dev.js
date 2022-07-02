const path = require("path");
const { DefinePlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",

  devServer: {
    // hot: true,
    hot: "only",
    static: {
      directory: "./public",
    },
    // compress: true, //默认开启
    proxy: {
      "/api": {
        //https://api.github.com/api/user
        target: "https://api.github.com",
        //https://api.github.com/user
        pathRewrite: { "^/api": "" },
        //host字段同步为https://api.github.com，但浏览器字段不会显示同步结果
        //不配置此项github会认为非同域阻拦请求
        //验证origin也是防御csrf的一种手段
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new DefinePlugin({
      PUBLIC_URL: "'/'",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
