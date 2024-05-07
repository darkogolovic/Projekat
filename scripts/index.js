const fectData = async () => {
  const response = await fetch("base.json");
  const data = await response.json();
  return data;
};

fectData().then((data) => {
  const products = document.querySelector(".products");
  const productArray = Object.values(data).flatMap((category) => category);
  initialState(productArray);
  showMoreFunction();
});

const initialState = (productArray) => {
  let prodSum = 0;
  const products = document.querySelector(".products");
  productArray.forEach((product) => {
    for (podk in product) {
      if (Array.isArray(product[podk])) {
        product[podk].forEach((item) => {
          products.innerHTML += `<article class="product ${item.category}" data-id="${item.id}">
            <div class="img-holder">
              <img src="${item.images[0]}" alt="${item.brand}" class="product-img"/>
            </div>
            <div class="product-info">
              <h2 class="product-name">${item.brand} - ${item.model}</h2>
              <p class="product-price">${item.price}&euro;</p>
            </div>
            <button class="add-to-cart">Add to cart</button>  
          </article>`;
          prodSum++;
          if (prodSum <= 3) {
            document
              .querySelectorAll(".product")
              .forEach((el) => el.classList.add("show"));
          }
        });
      }
    }
  });
};

const filterButtons = document.querySelectorAll(".button-value");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let counter = 0;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const selectedCategory = button.textContent.toLowerCase();
    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
      if (
        selectedCategory === "all" ||
        product.classList.contains(selectedCategory)
      ) {
        product.classList.add("show");
      } else {
        product.classList.remove("show");
      }
    });
    document.querySelectorAll(".product").forEach((product) => {
      if (product.classList.contains("show")) {
        counter++;
        if (counter <= 3) {
          product.classList.add("show");
        } else {
          product.classList.remove("show");
        }
      }
    });
  });
});
const showMoreFunction = () => {
  const showMore = document.querySelector(".show-more");
  showMore.addEventListener("click", () => {
    const visibleProducts = document.querySelectorAll(".product.show");

    const hiddenProducts = document.querySelectorAll(".product:not(.show)");
    const productCategory = document.querySelector(".product").classList[1];
    let displayCount = 0;
    hiddenProducts.forEach((product) => {
      if (displayCount < 3) {
        product.classList.add("show");
        displayCount++;
      } else {
        product.classList.remove("show");
      }
    });
  });
};

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

/*<article class="product show" data-id="${element[podk][i].id}">
          <div class="img-holder">
          <img
            src="${element[podk][i].images[0]}"
            alt="${element[podk][i].brand}"
            class="product-img"
          />
          </div>
          <div class="product-info">
          <h2 class="product-name">${element[podk][i].brand} - ${element[podk][i].model}</h2>
          <p class="product-price">${element[podk][i].price}&euro;</p>
        </div>
        <button class="add-to-cart">Add to cart</button>  
      </article>`;*/
