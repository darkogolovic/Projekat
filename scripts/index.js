const fectData = async () => {
  const response = await fetch("base.json");
  const data = await response.json();
  return data;
};

fectData().then((data) => {
  const products = document.querySelector(".products");
  let { man, women, kids } = { ...data };
  console.log(man, women, kids);
  man.shoes.forEach((shoe) => {
    console.log(shoe);
  });
  /* for (category in data) {
    for (pod in data[category]) {
      console.log(data[category][pod]);
      if (category == "man" && pod == "shoes") {
        for (let i = 0; i < data[category][pod].length; i++) {
          products.innerHTML += `<article class="product show">
          <img
            src="${data[category][pod][i].images[0]}"
            alt="${data[category][pod][i].model}"
            class="product-img"
          />
          <div class="product-info">

            <h2 class="product-name">${data[category][pod][i].brand},${data[category][pod][i].model}</h2>
            <p class="product-price">${data[category][pod][i].price}&euro;</p>
          </div>
          <button class="add-to-cart">Add to cart</button>
        </article>`;
        }
      }
    }
  }*/
});

// Carousel script

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
