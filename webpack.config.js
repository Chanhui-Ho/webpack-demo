const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index"),
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              //当处理到@import进来的样式时可以回退1步给postcss-loader添加前缀
              importLoaders: 1,
              //处理背景图片打包产生两个资源路径的问题
              //原因：css-loader会将图片路径转化为require引入，而css文件无法添加.default获取，所以要添加esModule
              esModule: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // [ext]: 扩展名
              // [name]: 文件名
              // [hash]: 文件内容
              // [contentHash]:
              // [hash:<length>]:
              // [path]:
              name: "img/[name].[hash:6].[ext]",
              // outputPath: "img",
              //超过limit大小的资源会使用调用file-loader拷贝到指定目录
              limit: 10 * 1024,
            },
          },
        ],
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       //此配置解决require引入图片时不加default
        //       //否则需require().default才能获得资源
        //       esModule: false
        //     }
        //   }
        // ],
      },
    ],
  },
};
