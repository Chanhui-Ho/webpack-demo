import klImg from "../img/01-konglong.jpg";
import "../css/img.css";

function addElement() {
  const oEle = document.createElement("div");

  //创建img标签，设置src，js导出
  const oImg = document.createElement("img");
  // oImg.src = require('../img/01-konglong.jpg').default;
  // oImg.src = require('../img/01-konglong.jpg');
  oImg.src = klImg;
  oEle.appendChild(oImg);

  //设置背景图片 css导出
  const obgImg = document.createElement("div");
  obgImg.className = "bgBox";
  oEle.appendChild(obgImg);

  return oEle;
}

document.body.appendChild(addElement());
