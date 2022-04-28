import "./index.scss";
import moment from "moment";

const hello = document.getElementById("hello");
const time = document.getElementById("time");

hello.addEventListener("click", () => {
  time.innerHTML = moment().format("MMMM Do YYYY, h:mm:ss a");
});
