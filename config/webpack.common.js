const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const resolveApp = require("./paths");

//定义对象保存base配置信息
const commonConfig = {
  // entry: "./src/index",
  // entry: {
  //   // index: "./src/index",
  //   lodashindex: { import: "./src/lodash-index", dependOn: "shared" },
  //   jqueryindex: { import: "./src/jquery-index", dependOn: "shared" },
  //   shared: ["lodash", "jquery"],
  // },
  // entry: "./src/split-index",
  entry: "./src/import-index",
  resolve: {
    //后缀名补全，默认只会补全.js和.json
    extensions: [".js", ".json", ".ts", ".jsx", ".vue"],
    alias: {
      "@": resolveApp("./src"),
      //   "@": path.resolve(__dirname, "../src"),
    },
  },
  output: {
    filename: "js/[name].bundle.js",
    path: resolveApp("./dist"),
    // path: path.resolve(__dirname, "../dist"),
    chunkFilename: "js/chunk_[name].js",
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
      //babel-loader ts
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        // use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //<%= htmlWebpackPlugin.options.title %>占位
      title: "html-webpack-plugin",
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    //当前文件的名称是按自然数进行编号排序，如果某个文件当前不再被依赖
    //那么重新打包时序号都会变，不利于缓存，影响性能
    // chunkIds: "natural",
    // chunkIds: "named",
    chunkIds: "deterministic",
    runtimeChunk: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
    // splitChunks: {
    //   chunks: "all", //同步异步都打包进来,
    //   cacheGroups: {
    //     drVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       filename: "js/[id]_vendor.js",
    //       priority: -10,
    //     },
    //     default: {
    //       minChunks: 2,
    //       filename: "js/dr_[id].js",
    //       priority: -20,
    //     },
    //   },
    // },
  },
};

module.exports = (env) => {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig, config);

  return mergeConfig;
};
