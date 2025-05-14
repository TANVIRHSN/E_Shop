let currentIndex = 0;
const slides = document.querySelector(".animate-slide");
const totalSlides = slides.children.length;

function showSlide(index) {
  currentIndex = (index + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function changeSlide(dir) {
  showSlide(currentIndex + dir);
}

setInterval(() => changeSlide(1), 4000);

// Product & Cart Logic
const productList = document.getElementById('product-list');
const popup = document.getElementById('popup');
const cart = JSON.parse(localStorage.getItem("cart")) || {};

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4">
          <h4 class="text-lg font-semibold mb-2">${product.title}</h4>
          <p class="text-gray-700 mb-4">$${product.price}</p>
          <button onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "")}', ${product.price})"
            class="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition">
            Add to Cart
          </button>
        </div>
      `;
      productList.appendChild(div);
    });
  })
  .catch(error => {
    productList.innerHTML = `<p class="text-red-500">Failed to load products. Try again later.</p>`;
    console.error("Error fetching products:", error);
  });

function addToCart(id, title, price) {
  if (!cart[id]) {
    cart[id] = { title, price, quantity: 1 };
  } else {
    cart[id].quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showPopup();
}

function showPopup() {
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}
