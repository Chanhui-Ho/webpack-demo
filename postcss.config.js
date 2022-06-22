module.exports = {
  plugins: [require("postcss-preset-env")],
};

//在webpack.config.js文件中配置的写法
//   {
//     loader: "postcss-loader",
//     options: {
//       postcssOptions: {
//         plugins: [
//           require("autoprefixer"),
//           require("postcss-preset-env"),
//         ],
//       },
//     },
//   },
