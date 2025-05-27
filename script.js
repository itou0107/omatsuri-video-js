document.addEventListener("DOMContentLoaded", function () {
  const helloDiv = document.createElement("div");
  helloDiv.textContent = "hello";
  document.body.insertBefore(helloDiv, document.body.firstChild);
});
