const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function loadTheme(){

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      body.classList.add('dark-mode');
      themeToggle.checked = true;
  }
}

loadTheme();

// Listen for toggle changes
function changeTheme(){
  if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('change', () => changeTheme());

// Desktop Dropdown Toggles
const genToggleDesktop = document.getElementById('gen-toggle-desktop');
const genMenuDesktop = document.getElementById('gen-menu-desktop');
const filterToggleDesktop = document.getElementById('filter-toggle-desktop');
const filterMenuDesktop = document.getElementById('filter-menu-desktop');

function toggleDropdown(event, activeToggle, activeMenu, otherToggle, otherMenu){
    event.stopPropagation();
    activeToggle.classList.toggle('active');
    activeMenu.classList.toggle('active');
    
    // Close other dropdown
    otherToggle.classList.remove('active');
    otherMenu.classList.remove('active');
}

genToggleDesktop.addEventListener('click', (event) => toggleDropdown(event, genToggleDesktop, genMenuDesktop, filterToggleDesktop, filterMenuDesktop));


filterToggleDesktop.addEventListener('click', (event) => toggleDropdown(event, filterToggleDesktop, filterMenuDesktop, genToggleDesktop, genMenuDesktop));

// Mobile Hamburger Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
});

// Mobile Nested Dropdown Toggles
const genToggleMobile = document.getElementById('gen-toggle-mobile');
const genMenuMobile = document.getElementById('gen-menu-mobile');
const filterToggleMobile = document.getElementById('filter-toggle-mobile');
const filterMenuMobile = document.getElementById('filter-menu-mobile');

genToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    genToggleMobile.classList.toggle('active');
    genMenuMobile.classList.toggle('active');
    
    // Close other section
    filterToggleMobile.classList.remove('active');
    filterMenuMobile.classList.remove('active');
});

filterToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    filterToggleMobile.classList.toggle('active');
    filterMenuMobile.classList.toggle('active');
    
    // Close other section
    genToggleMobile.classList.remove('active');
    genMenuMobile.classList.remove('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    // Desktop dropdowns
    if (!genToggleDesktop.contains(e.target) && !genMenuDesktop.contains(e.target)) {
        genToggleDesktop.classList.remove('active');
        genMenuDesktop.classList.remove('active');
    }
    if (!filterToggleDesktop.contains(e.target) && !filterMenuDesktop.contains(e.target)) {
        filterToggleDesktop.classList.remove('active');
        filterMenuDesktop.classList.remove('active');
    }
    
    // Mobile menu
    if (!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
    }
});

// Generation Filter Logic (works for both desktop and mobile)
const generationItems = document.querySelectorAll('[data-generation]');
generationItems.forEach(item => {
    item.addEventListener('click', () => {
        const generation = item.getAttribute('data-generation');
        
        // Remove active class from all generation items
        generationItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item (both desktop and mobile)
        document.querySelectorAll(`[data-generation="${generation}"]`).forEach(i => i.classList.add('active'));
        
        console.log(`Filtering by Generation ${generation}`);
        
        // Close menus
        genToggleDesktop.classList.remove('active');
        genMenuDesktop.classList.remove('active');
        genToggleMobile.classList.remove('active');
        genMenuMobile.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

// Type Filter Logic (works for both desktop and mobile)
const typeItems = document.querySelectorAll('[data-type]');
typeItems.forEach(item => {
    item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        
        // Remove active class from all type items
        typeItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item (both desktop and mobile)
        document.querySelectorAll(`[data-type="${type}"]`).forEach(i => i.classList.add('active'));
        
        console.log(`Filtering by Type: ${type}`);
        
        // Close menus
        filterToggleDesktop.classList.remove('active');
        filterMenuDesktop.classList.remove('active');
        filterToggleMobile.classList.remove('active');
        filterMenuMobile.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

// Search Button Logic
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search');



// Also allow pressing Enter key to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});
