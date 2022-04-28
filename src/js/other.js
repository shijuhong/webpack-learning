import sum from "../math/sum";

document.addEventListener("DOMContentLoaded", () => {
  const sumDiv = document.getElementById("sum");
  sumDiv.innerHTML = sum(3, 4, 5);
});
