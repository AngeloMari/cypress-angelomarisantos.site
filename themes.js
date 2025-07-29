const colorThemes = document.querySelectorAll('[name="theme"]');

const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

const applyTheme = function (theme) {
  document.documentElement.classList.remove(
    "red-theme",
    "yellow-theme",
    "green-theme"
  );
  document.documentElement.classList.add(`${theme}-theme`);
};

const setTheme = function () {
  const activeTheme = localStorage.getItem("theme") || "green";
  colorThemes.forEach((themeOption) => {
    themeOption.checked = themeOption.id === activeTheme;
  });
  applyTheme(activeTheme);
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    const theme = themeOption.id;
    storeTheme(theme);
    applyTheme(theme);
  });
});

document.addEventListener("DOMContentLoaded", setTheme);
