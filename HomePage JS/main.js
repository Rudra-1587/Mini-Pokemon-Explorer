import { startPokemonGenerationLimit, endPokemonGenerationLimit, changeLimit } from "./config.js";
import { pokemonFetch, paginationLoads, renderPokemonCards } from "./pokemon.js";

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


const pokemonGenLimitArray = [
  {name:"all", start : 0, end : 1025 },
  {name:"gen1", start : 0, end : 151},
  {name:"gen2", start : 151, end : 251 },
  {name:"gen3", start : 251, end : 386 },
  {name:"gen4", start : 386, end : 493 },
  {name:"gen5", start : 493, end : 649 },
  {name:"gen6", start : 649, end : 721,},
  {name:"gen7", start : 721, end : 809 },
  {name:"gen8", start : 809, end : 905 },
  {name:"gen9", start : 905, end : 1025 }, ];


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

// dropdown button highlight logic function
function selectedButtonHighlight(item, Items, dataType, toggle, menu){

    const type = item.getAttribute(`data-${dataType}`);

    Items.forEach(i => i.classList.remove('active'));

    document.querySelectorAll(`[data-${dataType}="${type}"]`).forEach(i => i.classList.add('active'));
    
    toggle.classList.remove('active');
    menu.classList.remove('active');
}

// pokemon generation dropdown button logic
const generationItems = document.querySelectorAll('[data-generation]');
generationItems.forEach(item => {
    item.addEventListener('click', () => {
        const data = Number(item.dataset.generation);

        const limits = pokemonGenLimitArray[data];
        changeLimit(limits.start, limits.end); 
        
        selectedButtonHighlight(item, generationItems, 'generation', genToggleDesktop, genMenuDesktop);

        paginationLoads(1);
        renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit,1);
        
    });
});

// pokemon types dropdown button logic
const typeItems = document.querySelectorAll('[data-type]');
typeItems.forEach(item => {
    item.addEventListener('click', () => {
        selectedButtonHighlight(item, typeItems, 'type',  filterToggleDesktop, filterMenuDesktop);
    });
});


// specific pokemon search logic
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search');

searchBtn.addEventListener('click', async(e) => {
  e.preventDefault();

  const query = searchInput.value.toLowerCase();
  const pokemonGrid = document.getElementById('pokemon-grid');
  const errorContainer = document.getElementById('error-message');

  try{
    if(query !== "") {
      console.log(`Searching for: ${query}`);

      const data = await pokemonFetch(query);

      if(!data){  
        errorContainer.innerHTML = `
          <h3>Data of pokemon ${query} is not found</h3>
        `;

        setTimeout(() => {
          errorContainer.innerHTML = "";
          searchInput.value = "";
        },3000);
        
      }else{
        searchInput.value = "";

        const id = data.id;
        const pokemon = data.name;
        const image = data.sprites.front_default;
        
        if(Number(id) <= 1025){
          pokemonGrid.innerHTML = `
          <div class="pokemon-card">
            <div class="card-image">
                <img src="${image}" alt="${pokemon}">
            </div>
            <h3 class="card-name">${pokemon}</h3>
            <p class="card-id">#${id}</p>
          </div>

          `;
        }
        
      }
      
    }
  }catch(error){
    console.error(error);
  }
});

// Also allow pressing Enter key to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
        searchInput.value = "";
    }
});

