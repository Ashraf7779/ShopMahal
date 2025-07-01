document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const addItemsBtn = document.getElementById('add-items-btn');
  let currentUser = localStorage.getItem('currentUser') || 'guest';

  function getUserKey(key) {
    return `${key}_${currentUser}`;
  }

  const productImages = {
    'Collar Kurta': 'assests/Kurta.webp',
    'Lenovo LOQ 2024, Intel Core i7': 'assests/Laptop_Lenovo.webp',
    'Noise Airwave Max 4 Wireless Headphones': 'assests/Headphone_Noise.webp',
    'Victorinox Stainless Steel Watch': 'assests/Watch_Victorinox.webp',
    'LEQTRONIQ Digital Camera': 'assests/LEQTRONIQ Digital Camera.webp',
    'iPhone 16 Pro Max 256 GB 5G Mobile Phone': 'assests/iPhone 16 Pro Max 256 GB 5G Mobile Phone.webp',
    'Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free': 'assests/Haier 596 L, Wi-Fi enabled Water Dispenser Frost Free.webp',
    'Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones': 'assests/Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones.webp',
    'Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display': 'assests/Samsung Galaxy Tab S10 FE, S Pen in-Box, 27.7 cm (10.9 inch) LCD Display.webp',
    'Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE': 'assests/Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - with LIGHTFORCE.webp',
    'LG 15 Kg, AI Direct Drive Technology, Wi-Fi, Steam Fully Automatic Front-Loading Washing Machine': 'assests/washing_machine.webp',
    'Hitachi 2 Ton Class 5 Star AC, 4-Way Swing, ice Clean, Xpandable+': 'assests/AC_Hitachi.webp',
    'JBL Go 4, Wireless Ultra Portable Bluetooth Speaker, Pro Sound': 'assests/JBL_Speaker.webp',
    'Karatcart Women Green American Diamond Stud Earrings': 'assests/Karatcart_Earrings.webp',
    'ZAVERI PEARLS Ethnic Kundan & Pearls Multi Layers Bridal Necklace Set For Women': 'assests/Bridal_Necklace.webp',
    'Panasonic 23L Convection Microwave Oven(NN-CT353BFDG,Black Mirror, 360° Heat Wrap, Magic Grill)': 'assests/Micro_Oven.webp',
    'Sony PS5® Console Video Game Digital - Fortnite Bundle (Slim)': 'assests/ps5.webp',
    'ShopMahal Brand - Myx Womens Embroidered Kurta Pant Set with Organza Dupatta': 'assests/women_kurta.webp',
    'Madame Embossed Cotton Blend Coffee Brown Top for Women': 'assests/women_top.webp',
    'ShopMahal Womens Woven Design Ethnic Motif Georgette Kanjeevaram Saree With Unstiched Blouse Piece': 'assests/women_saree.webp',
    'Campus Artemis Mens Lace-Up Running Shoes': 'assests/Campus_Shoe.webp',
    'U.S. POLO ASSN. Mens Brown Solid Mid Rise Cotton Button Slim Fit Trousers': 'assests/us_polo_pantMen.webp',
    'MANQ Mens Slim Fit Single Breasted Blazer': 'assests/Mens_Suite.webp',
    'Olivia Burton Ultra Slim Qtz Basic Dial Womens Watch': 'assests/Womens_watch.webp',
    'Conbre BulbXR 2MP Full HD Indoor Wireless WiFi CCTV Security Camera | Motion Tracking': 'assests/CCtv_Camera.webp',
    'Storio Rechargeable Toys Talking Cactus Baby Toys for Kids Dancing': 'assests/Kids_toy.webp',
    'HUDA GIRL Beauty Rose Gold Remastered + Nude Edition Eyeshadow Palette Combo Kit - 36 Matte and Shimmer Finishes, Includes Black Eyeshadow': 'assests/beauty_pack.webp',
    'KALP 2025 Dated Planner Kit | A5, 400 Pages': 'assests/KALP_book.webp',
    'Lifelong 8.6L Home Safe Locker with Key | Security Box for Home & Office | Strong Metal Safe - 5 mm Thick Door | Personal Locker': 'assests/Personal_locker.webp',
    'Elica 60 cm 1500 m3/hr Autoclean Baffle Filter Kitchen Chimney with 15 Years Warranty (WD TBF HAC 60 MS NERO, Touch + Motion Sensor Control, Black)': 'assests/Kitchen_Chimney.webp',
    'Russell Hobbs 17700 4-Slice Pop up Toaster | 1470W Power | Extra Long Slots | Variable Browning Control': 'assests/Toaster.webp',
    'KENT 16096 Classic Hot Air Fryer 4L 1300 W | 80% Less Oil | Instant Electric Air Fryer | Auto Cut Off | Fry, Grill, Roast, Steam, and Bake': 'assests/Hot_Air_Fryer.webp',
    'Arrow Mens Polyester Single Breasted Suits': 'assests/Mens_polyester_suit.webp',
    'abc garments Stylish Advocate Blazer for Men Single Breasted Regular Fit Latest Coat for Wedding Party and Office Wear (Blazer)': 'assests/Mens_Suit_PartyWear.webp',
    'Darbar In Single Breasted Casual, Formal, Party, Festive & Wedding Blazer': 'assests/Mens_Suite1.webp',
    'Arrow Mens Single Breasted Slim Blazer': 'assests/Mens_Suite2.webp',
    'CK Fashion Mens Waistcoat Slim Fit Dress Vest Wedding Waistcoat': 'assests/Mens_Suite3.webp',
    'Veera Paridhaan Mens Solid Waistcoat' : 'assests/Mens_Suite4.webp',
    'Arrow Men Business Suit Pants Set': 'assests/Mens_Suite5.webp',
    'TAHVO Mens Single Breasted Regular Fit Blazer for Occasion, Weddings, Party': 'assests/Mens_Suite6.webp',
    'Selvia Co-ord Set for Women|Collared Neck Co-ord Set for Women| Blazer and Trouser|Solid Co-ord Set|Coat and Pant|2 Piece|Formal Co-ord Set for Women| Lycra Co-ord Set': 'assests/Women_suit1.webp',
    'Selvia Western Dress for Women|Solid Lycra Western Dress for Women|Round Neck Shrug with Bodycon Dress for Women|Two Piece Knee-Length Dress for Women': 'assests/Women_suit2.webp',
    'Powersutra Womens Sage Green Notch Collar Stretch Suit with Blazer & Trousers | Single-Breasted | Button Closure | Elastic Waist Pants': 'assests/Women_suit3.webp',
    'Van Heusen Women Regular Fit Unlined Blazer': 'assests/Women_suit4.webp',
    'Blue Ronin Stylish Regular Fit Stylish Formal Blazer for Womens': 'assests/Women_suit5.webp',
    'SYMPLE Womens Pure Cotton Regular Fit Kurta | Stylish and Comfortable Calf Length Straight Kurta for Women and Girls | Floral Printed Round Neck 3/4 Sleeves Kurti for Daily and Casual Wear' : 'assests/Women_dress1.webp',
    'BHARVITA Womens Cotton Embroidered Chikankari Work Straight Kurta Dupatta Pant Set' : 'assests/Women_dress2.webp',
    'The Hope White Pure Cotton 3/4 Sleeve Ethnic Set for Women (Cream Pink)': 'assests/Women_dress3.webp',
    'HASRAT CRAFTS Anarkali Suit Set Women Kurta Set with Dupatta Womens Embroidery Designer Cotton Anarkali Kurta Pant Dupatta Suit' : 'assests/Women_dress4.webp',
    'ANNI DESIGNER Womens Rayon Blend Solid Straight Kurta with Pant & Dupatta' : 'assests/Women_dress5.webp',
    'GOMOSWA INTERNATIONAL Womens Viscose Silk Embroidered Straight Kurta with Viscose Silk Pant and Jacquard Jacquard Dupatta Sets': 'assests/Women_dress6.webp',
    'VASTRAMAY Mens Cotton Blend Regular Fit Tunic Tunic' : 'assests/Men_wear1.webp',
    'IndoPrimo Mens Stylish Solid Satin Casual Shirt for Men Full Sleeve' : 'assests/Men_wear2.webp',
    'DEELMO Mens Stylish Solid Satin Casual Shirt for Men Full Sleeves| Poly Satin Silk Shirt' : 'assests/Men_wear3.webp',
    'CVC Mens Regular Fit Full Sleeve Poly Satin Silk Shirt' : 'assests/Men_wear4.webp',
    'YOUNG & FORMALS by CAMBRIDGE Mens Slim Fit Solid Formal Shirt | Full Sleeves, Spread Collar | Premium': 'assests/Men_wear5.webp',
    'Kidbea 100% Linen Shirt & Pant Co-ord Set for Kids | Elegant & Comfortable Summer Wear' : 'assests/Kids_wear1.webp',
    'RECREATE Boys? Inspired Camouflage Print Co-ord Set ? Short Sleeve Shirt & Matching Shorts with Sunglasses ? Trendy Military Look for Toddlers' : 'assests/Kids_wear2.webp',
    'Kuchipoo Boys Regular Fit Cotton T-Shirts' : 'assests/Kids_wear3.webp',
    'KYDA KIDS Boys 100% Pure Cotton Premium Printed Tshirt and Shorts co-ords Set for Summer' : 'assests/Kids_wear4.webp',
    'BLOOD PANTHER Kid Girls 3 Piece Dress Set - Modern Lightweight Cotton Blend Printed Sleeveless T-Shirt' : 'assests/Kids_wear5.webp',
  };

  function formatIndianCurrency(amount) {
    let x = amount.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
  }

  function displayCart() {
    if (!cartItems || !cartTotal || !checkoutBtn || !addItemsBtn) {
      console.error('Required elements not found!');
      return;
    }
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart" style="color:black;font-weight:bold;">Your cart is empty.</p>';
      checkoutBtn.style.display = 'none';
      addItemsBtn.style.display = 'block';
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item-card';
        const imageSrc = productImages[item.name] || 'https://via.placeholder.com/100?text=Product';
        itemDiv.innerHTML = `
          <img src="${imageSrc}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4>${item.name} <span class="quantity">x ${item.quantity}</span></h4>
            <div class="price-remove">
              <span class="price">₹${formatIndianCurrency(item.price * item.quantity)}</span>
              <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
          </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
      });
      checkoutBtn.style.display = 'block';
      addItemsBtn.style.display = 'none';
    }
    cartTotal.textContent = `₹${formatIndianCurrency(total)}`;
    updateCartCount();
  }

  window.removeFromCart = function(name) {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity -= 1;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
      displayCart();
    }
  };

  window.checkout = function() {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    if (cart.length === 0) {
      alert('Your cart is empty. Add items before checking out!');
      return;
    }
    localStorage.setItem(getUserKey('checkoutCart'), JSON.stringify(cart));
    window.location.href = 'checkout.html';
  };

  window.goToHome = function() {
    window.location.href = 'index.html';
  };

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount > 0 ? cartCount : 0;
      console.log(`Cart count for ${currentUser} updated to:`, cartCount);
    } else {
      console.error('Cart count element not found!');
    }
  }

  displayCart();
  updateCartCount();
});

// Ensure initial cart count is updated on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  displayCart();
});