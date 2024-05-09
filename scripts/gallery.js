const leftButton = document.querySelector(".carousel-button-left");
const rightButton = document.querySelector(".carousel-button-right");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.querySelector(".carousel-nav");
const dots = document.querySelectorAll(".carousel-indicator");

let index = 0;

rightButton.addEventListener("click", () => {
  if (index < slides.length - 1) {
    index++;
    slides[index].classList.add("current-slide");
    slides[index - 1].classList.remove("current-slide");
  } else if (index === slides.length - 1) {
    index = 0;
    slides[index].classList.add("current-slide");
    slides[slides.length - 1].classList.remove("current-slide");
  }
  updateDots(index);
});

leftButton.addEventListener("click", () => {
  if (index > 0) {
    index--;
    slides[index].classList.add("current-slide");
    slides[index + 1].classList.remove("current-slide");
  } else if (index === 0) {
    index = slides.length - 1;
    slides[index].classList.add("current-slide");
    slides[0].classList.remove("current-slide");
  }

  updateDots(index);
});

const updateDots = (currentSlide) => {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("current-slide");
    } else {
      dot.classList.remove("current-slide");
    }
  });
};

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("carousel-indicator")) {
    const currentSlide = e.target.getAttribute("data-slide-to");
    index = currentSlide;
    dots.forEach((dot) => {
      dot.classList.remove("current-slide");
    });
    dots[index].classList.add("current-slide");
    slides.forEach((slide) => {
      slide.classList.remove("current-slide");
    });
    slides[index].classList.add("current-slide");
  }
});
