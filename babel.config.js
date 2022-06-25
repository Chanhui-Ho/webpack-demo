module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        //false: 不对当前的JS处理做polyfill的填充
        //usage: 依据用户源代码当中所使用到的新语法进行填充，按需填充
        //entry: 依据我们.browserslistrc文件当前筛选出来的浏览器决定填充什么，没用到的也会填充，体积更大,entry未生效时需要import两个依赖包
        useBuiltIns: "usage",
        //默认开启的corejs版本为2，装的是版本3，所以需要设置一下
        corejs: 3,
      },
    ],
    [
      //兼容jsx语法
      "@babel/preset-react",
    ],
    [
      //兼容ts语法
      "@babel/preset-typescript",
    ],
  ],
  plugins: [["react-refresh/babel"]],
};

//在webpack.config.js文件中配置的写法
// {
//     loader: "babel-loader",
//     options: {
//       presets: [
//         [
//           "@babel/preset-env",
//           {
//             //targets这里兼容规则优先于.browserslistrc文件
//             //targets: "chrome 91",
//           },
//         ],
//       ],
//     },
//   },
