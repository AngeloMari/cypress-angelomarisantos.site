// lightmode.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeButtons = document.querySelectorAll(".theme-switch");

  // Load saved mode from localStorage
  const savedMode = localStorage.getItem("lightMode");
  if (savedMode === "light") {
    body.classList.add("lightmode");
  }

  function toggleTheme() {
    body.classList.toggle("lightmode");
    const isLight = body.classList.contains("lightmode");
    localStorage.setItem("lightMode", isLight ? "light" : "dark");
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});
