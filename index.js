
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

if (!productContainer ) {
    console.error("Missing required HTML elements!");
}

let productCount = 0;  
const productsPerClick = 3; 
const products = [
    { img: "photos/photo10.jpg", name: "BLACK T-Shirt", price: "$29.99", _id: "1" },
    { img: "photos/photo15.jpg", name: "Casual Wear", price: "$22.99", _id: "2" },
    { img: "photos/photo12.jpg", name: "BLACK T-Shirt", price: "$49.99", _id: "3" },
    { img: "photos/photo13.jpg", name: "T-Shirt", price: "$59.99", _id: "4" },
    { img: "photos/photo11.jpg", name: "SUMMER WEARS", price: "$25.99", _id: "5" },
    { img: "photos/photo14.jpg", name: "T-Shirt", price: "$14.99", _id: "6" },
    { img: "photos/photo16.jpg", name: "WHITE T-Shirt", price: "$59.99", _id: "7" },
    { img: "photos/photo17.jpg", name: "NICK", price: "$25.99", _id: "8" },
    { img: "photos/photo18.jpg", name: "T-Shirt", price: "$14.99", _id: "9" }
];

const totalProducts = products.length;  

function addMoreImages() {
    for (let i = 0; i < productsPerClick; i++) {
        if (productCount >= totalProducts) {
            showMoreBtn.style.display = "none"; 
            return;
        }
        let product = products[productCount];  
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <h3 id="name">${product.name}</h3>
            <p>${product.price}</p>
            <div class="buttons">
                <button>Add to Cart</button>
               <button onclick="detailed('productId')">More</button>
               
            </div>
        `;
        productContainer.appendChild(productDiv);
        productCount++;
    }

    if (productCount >= totalProducts) {
        showMoreBtn.style.display = "none";  
    }
}
showMoreBtn.addEventListener('click', addMoreImages);

function detailed() {
    const nameElement = document.getElementById("name");
    if (!nameElement) {
        console.error("Element with id 'name' not found");
        return;
    }

    const name = nameElement.innerText;
    console.log("Searching for product:", name);

    fetch(`http://localhost:5000/api/products?name=${encodeURIComponent(name)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(data => {
        if (!data || data.length === 0) {
            alert("Product not found!");
            return;
        }

        const product = data[0]; // Assuming API returns an array of products
        console.log("Fetched product:", product);

        // Redirect to detailed.html using product ID
        window.location.href = `detailed.html?id=${product._id}`;
    })
    .catch(error => {
        console.error("Error fetching product:", error);
        alert("An error occurred while fetching the product. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const productDetailsElement = document.getElementById("productDetails");
    if (!productDetailsElement) {
        console.error("Element with id 'productDetails' not found");
        return;
    }

    // Show loading state
    productDetailsElement.innerHTML = "<p>Loading product details...</p>";

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Get product ID from URL

    if (!productId) {
        productDetailsElement.innerHTML = "<h1>Product not found</h1>";
        return;
    }

    try {
        // Fetch product details from the backend using product ID
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const product = await response.json();

        if (!product || product.message) {
            productDetailsElement.innerHTML = "<h1>Product not found</h1>";
            return;
        }

        // Display product details dynamically
        productDetailsElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <h1>${product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>${product.details}</p>
            <button onclick="addToCart('${product._id}', '${product.name}', '${product.price}')">Add to Cart</button>
        `;
    } catch (error) {
        productDetailsElement.innerHTML = "<h1>Error loading product</h1>";
        console.error("Error:", error);
    }
});
// Function to add product to cart (localStorage)
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}
