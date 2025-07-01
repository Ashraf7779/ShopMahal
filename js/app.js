document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartCount = document.getElementById("cart-count");
  const searchBar = document.getElementById("search-bar");

  let currentUser = localStorage.getItem('currentUser') || 'guest';
  function getUserKey(key) {
    return `${key}_${currentUser}`;
  }

  let checkoutCart = JSON.parse(localStorage.getItem(getUserKey('checkoutCart')) || '[]');

  // Sample products (commented out to avoid conflict with home.js)
  /*
  const products = [
    { id: 1, name: "Collar Kurta", price: 550, img: "path/to/collar-kurta.jpg" },
    { id: 2, name: "Noise Headphones", price: 1699, img: "path/to/headphones.jpg" }
  ];

  // Initial render of all products (commented out)
  if (products.length > 0) {
    renderProducts(products);
  } else {
    console.warn('Products array is empty or not defined.');
  }
  */

  // Update cart count based on quantity
  function updateCartCount() {
    const checkoutCart = JSON.parse(localStorage.getItem(getUserKey('checkoutCart')) || '[]');
    const count = checkoutCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCount) {
      cartCount.textContent = count > 0 ? count : '0';
      console.log('App - Cart count updated to:', count);
    }
  }
  updateCartCount();

  // Search functionality (commented out to avoid conflict with home.js)
  /*
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);
    });
  }
  */

  // Render product cards (commented out)
  /*
  function renderProducts(productArray) {
    if (!productList) {
      console.error('Product list container not found!');
      return;
    }
    productList.innerHTML = "";

    productArray.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
      `;

      productList.appendChild(card);
    });
  }
  */

  // Handle add to cart (keep this for compatibility with home.js)
  productList.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const id = parseInt(e.target.dataset.id);
      // Note: This assumes product IDs match home.js's data structure; adjust if needed
      const product = productData.itemNames.map((name, index) => ({ id: index + 1, name, price: productData.prices[index], img: productData.images[index] })).find(p => p.id === id);

      if (product) {
        const existing = checkoutCart.find(item => item.id === id);
        if (existing) {
          existing.quantity++;
        } else {
          checkoutCart.push({ ...product, quantity: 1, image: product.img });
        }

        localStorage.setItem(getUserKey('checkoutCart'), JSON.stringify(checkoutCart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
        console.log('App - Cart saved:', checkoutCart);
      } else {
        console.error('Product not found for ID:', id);
      }
    }
  });
});