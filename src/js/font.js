import "../font/iconfont.css";
import "../css/font.css";

function packFont() {
  const oEle = document.createElement("div");

  const obgImg = document.createElement("span");
    obgImg.className = "iconfont icon-tuichu font-tuichu";
  oEle.appendChild(obgImg);

  return oEle;
}

document.body.appendChild(packFont());
