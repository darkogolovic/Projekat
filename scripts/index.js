const fectData = async () => {
  const response = await fetch("base.json");
  const data = await response.json();
  return data;
};

fectData().then((data) => {
  const products = document.querySelector(".products");
  let { man, women, kids } = { ...data };

  const padajuci = document.querySelectorAll(".dropdown");
  padajuci.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`${e.target.textContent.toLowerCase()}`);

      let podkategorija = filter(e.currentTarget.parentElement.id);

      products.innerHTML = "";
      podkategorija.forEach((element) => {
        products.innerHTML += `<article class="product show" data-id="${element.id}">
          <div class="img-holder">
          <img
            src="${element.images[0]}"
            alt="${element.model}"
            class="product-img"
          />
          </div>
          <div class="product-info">
          <h2 class="product-name">${element.brand} - ${element.model}</h2>
          <p class="product-price">${element.price}&euro;</p>
        </div>
        <button class="add-to-cart">Add to cart</button>
      </article>`;
      });
    });
  });

  const filter = function (e) {
    if (e === "men") {
      return "men";
    } else if (e === "women") {
      return "women";
    } else if (e === "kids") {
      return "kids";
    }
  };

  for (category in data) {
    for (pod in data[category]) {
      if (category == "man" || category == "women" || category == "kids") {
        for (let i = 0; i < data[category][pod].length; i++) {
          products.innerHTML += `<article class="product show " data-id="${data[category][pod][i].id}">
          <div class="img-holder">
          <img
            src="${data[category][pod][i].images[0]}"
            alt="${data[category][pod][i].model}"
            class="product-img"
          />
          </div>
          <div class="product-info">

            <h2 class="product-name">${data[category][pod][i].brand} - ${data[category][pod][i].model}</h2>
            <p class="product-price">${data[category][pod][i].price}&euro;</p>
          </div>
          <button class="add-to-cart">Add to cart</button>
        </article>`;
        }
      }
    }
  }
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

const showMoreBtn = document.querySelector(".show-more");

showMoreBtn.addEventListener("click", () => {
  const productsSection = document.querySelector(".products-section");
});

// Single product script

const openSingleProduct = document.querySelector(".products");

openSingleProduct.addEventListener("click", async (e) => {
  const productData = await fectData();

  const productId = e.target.getAttribute("data-id");
  console.log(productId);
  const productArray = Object.keys(productData).map((key) => productData[key]);
  let selectedProduct;
  productArray.forEach((obj) => {
    for (let podk in obj) {
      for (let i = 0; i < obj[podk].length; i++) {
        if (obj[podk][i].id == productId) {
          selectedProduct = obj[podk][i];
          console.log(selectedProduct);
        }
      }
    }
  });

  if (selectedProduct) {
    const productDataString = encodeURIComponent(
      JSON.stringify(selectedProduct)
    );

    // Prenosenje podataka preko URla
    window.location.href = `single-article.html?product=${productDataString}`;
  } else {
    console.error("Selected product not found");
  }
});
