const urlParams = new URLSearchParams(window.location.search);
const productDataString = urlParams.get("product");

const productData = JSON.parse(decodeURIComponent(productDataString));

// Desturktuiranje podataka
const { brand, model, price, sizes, images } = productData;
const articleContainer = document.querySelector(".article-container");

// Prikazati proizvod na stranici

articleContainer.innerHTML = `
<div class="article-images">
          <div class="main-img"><img src="${images[0]}" alt="${brand}" /></div>
          <div class="sub-img"><img src="${images[1]}" alt="${brand}" /> </div>
          <div class="sub-img"><img src="${images[2]}" alt="${brand}" /> </div>
        </div>

        <div class="article-info">
          <h1>${brand} - ${model}</h1>
          <div class="sizes">
            <h3>Available sizes:</h3>
            <ul class="sizes-list">
              ${sizes.map((size) => `<li>${size}</li>`).join("")}
            </ul>
          </div>

          <p class="price">&euro; ${price}</p>

          <button class="add-to-cart " id="add">Add to cart</button>
        </div>`;

const switchPicture = document.querySelectorAll(".article-images img");

switchPicture.forEach((img) => {
  img.addEventListener("click", (e) => {
    const mainImg = document.querySelector(".main-img img");
    [mainImg.src, e.target.src] = [e.target.src, mainImg.src];

    if (e.target.parentElement.classList.contains("main-img")) {
      openModal(e.target.src);
    }
  });
});
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".modal").addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    cartModal.style.display = "none";
  }
});

function openModal(imagePath) {
  let modal = document.getElementById("myModal");
  let modalImg = document.getElementById("modalImg");
  modal.style.display = "block";
  modalImg.src = imagePath;
}

function closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Cart modal

const cart = document.querySelector(".cart");
const addBtn = document.querySelector("#add");
const cartItem = document.querySelector("#cart-item");
const totalPrice = document.querySelector("#total-price");
cartItem.innerHTML = localStorage.getItem("cartItem");
totalPrice.innerHTML = "&euro;" + " " + localStorage.getItem("count");
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-modal");
const cartClose = document.querySelector(".cart-close");

cartIcon.addEventListener("click", () => {
  cartModal.style.display = "block";
  if (
    localStorage.getItem("itemCounter") == 0 ||
    !localStorage.getItem("itemCounter")
  ) {
    cartItem.innerHTML = `<h2>Your cart is empty</h2>`;
  }
});

let count = Number(localStorage.getItem("count")) || 0;
let itemCounter = Number(localStorage.getItem("itemCounter")) || 0;

cartIcon.setAttribute("data-count", itemCounter);

addBtn.addEventListener("click", () => {
  cartItem.innerHTML += `<div class="cart-item">
  <div class="cart-img">
    <img src="${images[0]}" alt="${brand}" />
  </div>
  <p>${brand} - ${model}</p>
  <h2>&euro; ${price}.00</h2>
  <i class="fa-solid fa-trash-can"></i>
</div> `;
  addTrashListeners();
  itemCounter++;
  localStorage.setItem("itemCounter", itemCounter);
  cartIcon.setAttribute("data-count", itemCounter);
  count = count + price;
  console.log(count);
  localStorage.setItem("count", count);
  totalPrice.innerHTML = "&euro;" + " " + count;
  localStorage.setItem("cartItem", cartItem.innerHTML);
});

const addTrashListeners = function () {
  cartItem.querySelectorAll(".fa-trash-can").forEach((el) => {
    el.addEventListener("click", (e) => {
      itemCounter--;

      cartIcon.setAttribute("data-count", itemCounter);
      localStorage.setItem("itemCounter", itemCounter);

      e.currentTarget.parentElement.remove();
      count = count - price;
      console.log(count);
      if (count <= 0) {
        count = 0;
        cartItem.innerHTML = `<h2>Your cart is empty</h2>`;
      }
      totalPrice.innerHTML = "&euro;" + " " + count;

      localStorage.setItem("cartItem", cartItem.innerHTML);
      localStorage.setItem("count", count);
    });
  });
};

cartClose.addEventListener("click", () => {
  cartModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == cartModal) {
    cartModal.style.display = "none";
  }
});
