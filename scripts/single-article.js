const urlParams = new URLSearchParams(window.location.search);
const productDataString = urlParams.get("product");

// Dekodirajte JSON string podataka o proizvodu
const productData = JSON.parse(decodeURIComponent(productDataString));

// Koristite podatke o proizvodu kako želite (npr. prikaz na stranici)
const { brand, model, price, sizes, images } = productData;
const articleContainer = document.querySelector(".article-container");

console.log(productData);
