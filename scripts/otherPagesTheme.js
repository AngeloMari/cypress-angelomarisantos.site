// Color picker
const theme = localStorage.getItem("theme") || "green";
document.documentElement.classList.add(`${theme}-theme`);

// Light mode
if (localStorage.getItem("lightMode") === "light") {
  document.documentElement.classList.add("lightmode");
}
