// lightmode.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeButtons = document.querySelectorAll(".theme-switch");

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("lightmode");
  }

  // Toggle function
  function toggleTheme() {
    body.classList.toggle("lightmode");
    const isLight = body.classList.contains("lightmode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Attach toggle event to each theme switch button
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});
