// Define formatIndianCurrency globally
function formatIndianCurrency(amount) {
    let x = amount.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
  }
  
  // Store product data globally
  const productData = {
    itemNames: ['Collar Kurta', 'Lenovo LOQ 2024, Intel Core i7', 'Noise Airwave Max 4 Wireless Headphones', 'Victorinox Stainless Steel Watch', 'LEQTRONIQ Digital Camera', 'iPhone 16 Pro Max 256 GB 5G Mobile Phone', 'Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free', 'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones', 'Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display', 'Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE'],
    prices: [550, 99990, 1699, 106240, 15999, 122900, 69980, 17881, 53999, 12495],
    images: [
      'assests/kurta.webp',
      'assests/Laptop_Lenovo.webp',
      'assests/Headphone_Noise.webp',
      'assests/Watch_Victorinox.webp',
      'assests/LEQTRONIQ Digital Camera.webp',
      'assests/iPhone 16 Pro Max 256 GB 5G Mobile Phone.webp',
      'assests/Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free.webp',
      'assests/Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones.webp',
      'assests/Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display.webp',
      'assests/Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE.webp'
    ],
    categories: ['men-wear', 'electronics', 'home-gadgets', 'accessories', 'electronics', 'electronics', 'home-gadgets', 'accessories', 'electronics', 'electronics']
  };
  
  let currentUser = localStorage.getItem('currentUser') || 'guest';
  
  function getUserKey(key) {
    return `${key}_${currentUser}`;
  }
  
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount > 0 ? cartCount : 0;
    }
  }
  
  function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart')) || '[]');
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ name, price, quantity: 1 });
    localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
    showNotification(`Added ${name} to cart!`);
    updateCartCount();
  }
  
  function showNotification(message) {
    const notification = document.getElementById('cart-notification');
    if (!notification) return;
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = 1;
    setTimeout(() => {
      notification.style.opacity = 0;
      setTimeout(() => notification.style.display = 'none', 500);
    }, 2000);
  }
  
  function loadProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    productList.innerHTML = '';
  
    const indices = Array.from({ length: productData.itemNames.length }, (_, i) => i)
      .filter(i => productData.categories[i] === 'electronics');
  
    if (indices.length === 0) {
      productList.innerHTML = '<p class="no-products-found">No products found</p>';
    } else {
      indices.forEach(index => {
        const product = document.createElement('div');
        product.className = 'product-card';
        product.innerHTML = `
          <div class="content-wrapper">
            <img src="${productData.images[index]}" alt="${productData.itemNames[index]}">
            <div class="product-info">
              <h3>${productData.itemNames[index]}</h3>
              <p>₹${formatIndianCurrency(productData.prices[index])}</p>
            </div>
          </div>
          <button onclick="addToCart('${productData.itemNames[index]}', ${productData.prices[index]})">Add to Cart</button>
        `;
        productList.appendChild(product);
      });
    }
  }
  
  // Initialize page
  document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
  
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    if (navToggle && navMenu && dropdown && dropdownContent) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (window.innerWidth <= 768) {
          dropdown.classList.remove('active');
        }
      });
  
      dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
  
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !dropdown.contains(e.target) && !navToggle.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }
  });