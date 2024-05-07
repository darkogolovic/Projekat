const urlParams = new URLSearchParams(window.location.search);
const productDataString = urlParams.get("product");

const productData = JSON.parse(decodeURIComponent(productDataString));

// Desturktuiranje podataka
const { brand, model, price, sizes, images } = productData;
const articleContainer = document.querySelector(".article-container");

console.log(productData);

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

          <p class="price">$${price}</p>

          <button class="add-to-cart">Add to cart</button>
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
