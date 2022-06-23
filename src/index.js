import "core-js/stable";
import "regenerator-runtime/runtime";

const p = new Promise((resolve, rejected) => {
  resolve("derick");
});
console.log(p);

const title = "derick";
const fn = () => {
  console.log(title);
};
fn();

// import "./css/index.css";
// import "./css/index.less";

// import { add, mul } from "./js/func.js";
// const getData = require("./js/api.js");
// add(10, 20);
// mul(10, 20);
// console.log(getData());

// import "./js/image.js";
// import "./js/font.js";
