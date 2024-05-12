const barsIcon = document.querySelector(".bars-icon");
const dropdown = document.querySelector(".dropdown");
const close = document.querySelector("#dropdown-close");

barsIcon.addEventListener("click", () => {
  dropdown.style.display = "flex";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dropdown.style.display = "none";
  }
});

close.addEventListener("click", () => {
  dropdown.style.display = "none";
});
