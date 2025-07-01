document.addEventListener('DOMContentLoaded', () => {
  // Wait for the animation to complete before updating cart count
  setTimeout(() => {
    updateCartCount();
  }, 1400); // 0.4s delay + 1s animation duration

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    if (name && email && message) {
      const messageElement = document.getElementById('form-message');
      messageElement.textContent = "Thank you for contacting us! We'll get back to you soon.";
      messageElement.style.display = 'block';
      this.reset(); // Clear form
      // Add shake animation on success
      this.classList.add('animate__shakeX');
      setTimeout(() => this.classList.remove('animate__shakeX'), 1000);
    } else {
      alert('Please fill in all fields!');
    }
  });
});

// Cart count update (sync with other pages)
function updateCartCount() {
  let currentUserObj = JSON.parse(localStorage.getItem('currentUser') || '{}');
  let currentUser = currentUserObj.username || 'guest';
  function getUserKey(key) {
    return `${key}_${currentUser}`;
  }

  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    const checkoutCartRaw = localStorage.getItem(getUserKey('checkoutCart'));
    const checkoutCart = JSON.parse(checkoutCartRaw || '[]');
    console.log('Debug - Current User Object:', currentUserObj);
    console.log('Debug - Current User:', currentUser);
    console.log('Debug - Checkout Cart Key:', getUserKey('checkoutCart'));
    console.log('Debug - Checkout Cart Raw:', checkoutCartRaw);
    console.log('Debug - Checkout Cart Parsed:', checkoutCart);
    const count = checkoutCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    cartCountElement.textContent = count || '0';
  }
}