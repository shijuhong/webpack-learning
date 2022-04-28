import sum from "./math/sum";
import "./js/other";
import "./index.css";
import "./index.scss";
import "./index.less";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

let a = 3;
let b = 4;
console.log(sum(a, b, 5, 6));

const time = document.getElementById("time");
setInterval(() => {
  time.innerHTML = moment().format("MMMM Do YYYY, h:mm:ss a");
}, 1000);
