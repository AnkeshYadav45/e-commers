function greet() {
    alert("Hello let shop with us");
  }  
  function navigateTologin() {
    window.location.href = "login.html"; 
}
function registerhere(){
  window.location.href = "register.html"; 
} 
function navigateToHome() {
    window.location.href = "index.html"; 
}
 const productContainer = document.getElementById('productContainer');
const showMoreBtn = document.getElementById('showMoreBtn');

let productCount = 0;  // Number of loaded products
const totalProducts = 9; // Maximum number of products
const productsPerClick = 3; // Number of products per click

const products = [
    { img: "photos/photo10.jpg", name: " BLACK T-Shirt", price: "$29.99" },
    { img: "photos/photo15.jpg", name: "Casual Wear", price: "$22.99" },
    { img: "photos/photo12.jpg", name: " BLACK T-Shirt", price: "$49.99" },
    { img: "photos/photo13.jpg", name: "T-Shirt", price: "$59.99" },
    { img: "photos/photo11.jpg", name: "SUMMER WEARS", price: "$25.99" },
    { img: "photos/photo14.jpg", name: "T-Shirt", price: "$14.99" },
    { img: "photos/photo16.jpg", name: "WHITE T-Shirt", price: "$59.99" },
    { img: "photos/photo17.jpg", name: "NICK", price: "$25.99" },
    { img: "photos/photo18.jpg", name: "T-Shirt", price: "$14.99" }
];

function addMoreImages() {
    for (let i = 0; i < productsPerClick; i++) {
        if (productCount >= totalProducts) {
            showMoreBtn.style.display = "none"; // Hide button if all products are loaded
            return;
        }

        let product = products[productCount % products.length];

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="buttons">
                <button>Add to Cart</button>
                <button>More</button>
            </div>
        `;

        productContainer.appendChild(productDiv);
        productCount++;
    }

    if (productCount >= totalProducts) {
        showMoreBtn.style.display = "none";  // Hide button after all products are shown
    }
}

showMoreBtn.addEventListener('click', addMoreImages);
