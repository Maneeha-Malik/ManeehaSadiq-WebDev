// app.js

// 1. DATA: Product list
const products = [
    { id: 1, name: "Smart Watch", price: 150, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", desc: "Premium smart watch with heart rate monitor." },
    { id: 2, name: "Headphones", price: 200, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", desc: "Noise cancelling wireless headphones." },
    { id: 3, name: "Camera", price: 500, image: "https://i.pinimg.com/1200x/6c/cf/7e/6ccf7e7308a0900f02bb33fac6798b29.jpg", desc: "Professional camera for begineer" },
    { id: 4, name: "Sneakers", price: 80, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", desc: "Comfortable running shoes." },
    { id: 5, name: "Backpack", price: 60, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", desc: "Waterproof laptop backpack." },
    { id: 6, name: "Sunglasses", price: 120, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", desc: "Polarized designer sunglasses." }
];

// 2. AUTH LOGIC
function handleSignup() {
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        pass: document.getElementById('pass').value
    };
    localStorage.setItem('userData', JSON.stringify(user));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const savedUser = JSON.parse(localStorage.getItem('userData'));

    if (savedUser && savedUser.email === email && savedUser.pass === pass) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "index.html";
    } else {
        alert("Wrong email or password!");
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
}

// 3. PRODUCT DISPLAY
function displayProducts() {
    const list = document.getElementById('product-list');
    if (!list) return;
    
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="viewDetails(${p.id})">View Details</button>
            <button style="background: #10b981; margin-top: 5px;" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function viewDetails(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product.html';
}

function loadProductDetail() {
    const id = localStorage.getItem('selectedProductId');
    const product = products.find(p => p.id == id);
    const container = document.getElementById('product-detail-container');
    
    container.innerHTML = `
        <img src="${product.image}" style="width: 400px; border-radius: 10px;">
        <div>
            <h1>${product.name}</h1>
            <p style="font-size: 20px; color: #64748b;">${product.desc}</p>
            <h2 style="color: #2563eb;">$${product.price}</h2>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
}

// 4. CART LOGIC
let cart = JSON.parse(localStorage.getItem('cartData')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({...product, qty: 1});
    }
    
    localStorage.setItem('cartData', JSON.stringify(cart));
    alert("Added to cart!");
}

function displayCart() {
    const container = document.getElementById('cart-items-container');
    let total = 0;
    
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <div><h4>${item.name}</h4><p>$${item.price}</p></div>
                <div>
                    <button style="width: 30px;" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button style="width: 30px;" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <button style="width: 80px; background: #ef4444;" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    }).join('');
    document.getElementById('cart-total').innerText = total;
}

function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    item.qty += change;
    if (item.qty < 1) removeItem(id);
    else {
        localStorage.setItem('cartData', JSON.stringify(cart));
        displayCart();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cartData', JSON.stringify(cart));
    displayCart();
}

// 5. CHECKOUT
function placeOrder() {
    alert("Order Placed Successfully! Thank you for shopping.");
    localStorage.removeItem('cartData');
    window.location.href = "index.html";
}