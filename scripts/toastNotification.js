function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document
  .getElementById("testing-container")
  .addEventListener("click", function (e) {
    e.preventDefault(); // prevents the anchor from navigating
    showToast("This section is still under development. :))");
  });
