const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // watch: true, //webpack --watch
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "./src/index"),
  output: {
    filename: "js/build.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    // assetModuleFilename: "img/[name].[hash:4][ext]",//全局指定资源路径
  },
  // target: "web", //此配置屏蔽.browserslistrc配置
  devServer: {
    // hot: true,
    hot: "only",
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
    },
    compress: true,
  },
  module: {
    rules: [
      //css postcss
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
      //less postcss
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      //url-loader file-loader
      {
        // test: /\.(png|svg|gif|jpe?g)$/,
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       // [ext]: 扩展名
        //       // [name]: 文件名
        //       // [hash]: 文件内容
        //       // [contentHash]:
        //       // [hash:<length>]:
        //       // [path]:
        //       name: "img/[name].[hash:6].[ext]",
        //       // outputPath: "img",
        //       //超过limit大小的资源会使用调用file-loader拷贝到指定目录
        //       limit: 10 * 1024,
        //     },
        //   },
        // ],
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
      //asset/resource asset/inline asset
      {
        // test: /\.(png|svg|gif|jpe?g)$/,
        // type: "asset/resource",
        // generator: {
        //   filename: "img/[name].[hash:4][ext]",
        // },

        // test: /\.(png|svg|gif|jpe?g)$/,
        // type: "asset/inline",

        test: /\.(png|svg|gif|jpe?g)$/,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:4][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      //asset/resource 处理字体
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:3][ext]",
        },
      },
      //babel-loader js jsx
      {
        // test: /\.js$/,
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      //vue-loader
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //<%= htmlWebpackPlugin.options.title %>占位
      title: "html-webpack-plugin",
      template: "./public/index.html",
    }),
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
    new ReactRefreshWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
