const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

//获取配置文件
const config = require("../webpack.config.js");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.listen(5000, ()=>{
    console.log("[development] server start in port 5000");
});