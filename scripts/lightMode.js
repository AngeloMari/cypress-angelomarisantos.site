document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeButtons = document.querySelectorAll(".theme-switch");

  // Function to (reload and modify particles config
  function loadParticles(isLightMode) {
    fetch("/scripts/particles-config.json") // update path if different
      .then((res) => res.json())
      .then((config) => {
        const newColor = isLightMode ? "#333333" : "#fefefe";

        // Modify the particle colors
        config.particles.color.value = newColor;

        // Destroy old particles instance
        if (window.pJSDom && window.pJSDom.length) {
          window.pJSDom[0].pJS.fn.vendors.destroypJS();
          window.pJSDom = [];
        }

        particlesJS("particles-js", config);
      });
  }

  // Load saved theme
  const savedMode = localStorage.getItem("lightMode");
  const isLight = savedMode === "light";
  if (isLight) body.classList.add("lightmode");

  // Load particles on initial load
  loadParticles(isLight);

  // Theme toggle logic
  function toggleTheme() {
    body.classList.toggle("lightmode");
    const isNowLight = body.classList.contains("lightmode");
    localStorage.setItem("lightMode", isNowLight ? "light" : "dark");

    // Reload particles with new theme
    loadParticles(isNowLight);
  }

  // Attach to theme buttons
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});
