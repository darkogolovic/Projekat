const fectData = async () => {
  const response = await fetch("base.json");
  const data = await response.json();
  return data;
};

fectData().then((data) => {
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
          products.innerHTML += `<article class="product ${item.category} all" data-id="${item.id}">
            <div class="img-holder">
              <img src="${item.images[0]}" alt="${item.brand}" class="product-img"/>
            </div>
            <div class="product-info">
              <h2 class="product-name">${item.brand} - ${item.model}</h2>
              <p class="product-price">${item.price}&euro;</p>
            </div>
            <button class="add-to-cart read-more" data-id="${item.id}">Read more...</button>
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
  const openProductButtons = document.querySelectorAll(".read-more");

  openProductButtons.forEach((button) => {
    button.addEventListener("click", openSingleProduct);
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
        product.classList.remove("all");
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
    const hiddenProducts = document.querySelectorAll(".product:not(.show)");
    let displayCount = 0;
    hiddenProducts.forEach((product) => {
      if (
        (displayCount < 3 &&
          product.classList[1] ===
            document
              .querySelector(".button-value.active")
              .textContent.toLowerCase()) ||
        product.classList[2] === "all"
      ) {
        console.log("da");
        product.classList.add("show");
        displayCount++;
      } else {
        product.classList.remove("show");
      }
    });
  });
};

// Single product script

const openSingleProduct = async (e) => {
  const productData = await fectData();
  const productId = e.target.getAttribute("data-id");
  const productArray = Object.values(productData).flatMap((category) =>
    Object.values(category).flatMap((subcategory) => subcategory)
  );
  let selectedProduct;
  productArray.forEach((product) => {
    if (product.id == productId) {
      selectedProduct = product;
      console.log("Selected product:", selectedProduct);
    }
  });

  if (selectedProduct) {
    const productDataString = encodeURIComponent(
      JSON.stringify(selectedProduct)
    );

    // Prenosenje podataka preko URL-a
    window.location.href = `single-article.html?product=${productDataString}`;
  } else {
    console.error("Selected product not found");
  }
};

// search script
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    product.classList.add("all");
    const productName = product.querySelector(".product-name").textContent;
    if (productName.toLowerCase().includes(searchValue)) {
      product.classList.add("show");
      console.log(productName);
    } else {
      product.classList.remove("show");
    }
  });
});
