//babel代码转换测试
// import "core-js/stable";
// import "regenerator-runtime/runtime";

// const p = new Promise((resolve, rejected) => {
//   resolve("derick");
// });
// console.log(p);

// const title = "derick";
// const fn = () => {
//   console.log(title);
// };
// fn();
// --------------------------------------------------------------------

//loader测试
// import "./css/index.css";
// import "./css/index.less";

// import { add, mul } from "./js/func.js";
// const getData = require("./js/api.js");
// add(10, 20);
// mul(10, 20);
// console.log(getData());

// import "./js/image.js";
// import "./js/font.js";
// --------------------------------------------------------------------

//热更新测试
import "./js/hmr.js";
if (module.hot) {
  module.hot.accept(["./js/hmr.js"], () => {
    console.log("accrpt hmr.js");
  });
}
// --------------------------------------------------------------------

//react语法兼容以及react热更新兼容测试
import "./react/index.js";
// --------------------------------------------------------------------

//vue2语法兼容以及vue2热更新兼容测试
import "./vue/index.js";
// --------------------------------------------------------------------

//dev-server中hot:"only"配置测试
import "./js/hotonly.js";
if (module.hot) {
  module.hot.accept(["./js/hotonly.js"], () => {
    console.log("accrpt hotonly.js");
  });
}
// --------------------------------------------------------------------

//dev-server里proxy解决跨域测试
import "./js/proxyAxios.js";
// --------------------------------------------------------------------

//ts兼容测试
import "./ts/loader.ts";
// --------------------------------------------------------------------