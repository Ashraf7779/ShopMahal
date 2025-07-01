// search.js

// Hamburger menu toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('active');
});

// Search functionality
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('#search-bar');

// Function to perform the search
function performSearch() {
  const query = searchBar.value.trim();
  if (query) {
    // Only trigger if not on index.html (to avoid conflict with home.js)
    if (!window.location.pathname.includes('index.html')) {
      console.log('Searching for:', query);
      // Example: Redirect to a search results page (uncomment if needed)
      // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
  } else {
    alert('Please enter a search term!');
  }
}

// Trigger search on icon click
searchIcon.addEventListener('click', performSearch);

// Trigger search on Enter key in the search bar
searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});