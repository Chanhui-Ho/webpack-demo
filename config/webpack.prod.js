const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
    mode: "production",
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        PUBLIC_URL: "'./'",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ],
  };