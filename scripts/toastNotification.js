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

    // if you still want to redirect after the toast:
    setTimeout(() => {
      window.location.href = this.href;
    }, 1000); // delay navigation so toast is visible
  });
