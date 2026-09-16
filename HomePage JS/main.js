const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Listen for toggle changes

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } 
});

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

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!genToggleDesktop.contains(e.target) && !genMenuDesktop.contains(e.target)) {
        genToggleDesktop.classList.remove('active');
        genMenuDesktop.classList.remove('active');
    }
    if (!filterToggleDesktop.contains(e.target) && !filterMenuDesktop.contains(e.target)) {
        filterToggleDesktop.classList.remove('active');
        filterMenuDesktop.classList.remove('active');
    }
});

function selectedButonHighlight(item, Items, dataType, toggle, menu){

    const type = item.getAttribute(`data-${dataType}`);

    Items.forEach(i => i.classList.remove('active'));

    document.querySelectorAll(`[data-${dataType}="${type}"]`).forEach(i => i.classList.add('active'));
    
    toggle.classList.remove('active');
    menu.classList.remove('active');
}

const generationItems = document.querySelectorAll('[data-generation]');
generationItems.forEach(item => {
    item.addEventListener('click', () => {
       
        selectedButonHighlight(item, generationItems, 'generation', genToggleDesktop, genMenuDesktop);

    });
});

const typeItems = document.querySelectorAll('[data-type]');
typeItems.forEach(item => {
    item.addEventListener('click', () => {
        selectedButonHighlight(item, typeItems, 'type',  filterToggleDesktop, filterMenuDesktop);
    });
});