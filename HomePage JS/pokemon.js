const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search');
const totalPokemonPages = 52;

// fetch data from PokeAPI
async function pokemonFetch(value){
  try{
    let response;
    if(typeof value === "string"){
      response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    }else{
      response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${value}`);
    }

    if(!response.ok){
      throw new Error('Could not fetch data');
    }

    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
}

// create pokemon cards 
async function renderPokemonCards(pageNumber){

  const pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = "";

  let offset = (pageNumber-1)*20;
  if(pageNumber===1){
    offset = 0;
  }
  console.log(offset);

  try{
    
    const data = await pokemonFetch(offset);
    console.log(data);

    for(const element of data.results){
      const data = await pokemonFetch(element.name);

      console.log(data);
      const id = data.id;
      const pokemon = data.name;
      const image = data.sprites.front_default;


      // 1025 value is total pokemon appeared in pokemon series it does not includes
      if(id <= 1025){
        pokemonCards += `
        <div class="pokemon-card">
            <div class="card-image">
                <img src="${image}" alt="${pokemon}">
            </div>
            <h3 class="card-name">${pokemon}</h3>
            <p class="card-id">#${id}</p>
        </div>
      
      `;
      }

    };
    
    pokemonGrid.innerHTML=pokemonCards;
      
  }catch(error){
    console.error(error);
  }

}

// specific pokemon search logic
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

// loads pagination according to page number
function paginationLoads(page){
  let pageNumber = Number(page);

  let pagesHtml = "";
  if(pageNumber < 4 ){
    pagesHtml=`
    
        <span>
            <button class="arrow-btn" id="prev-arrow-btn">&larr;</button>
        </span>

        <button class="page-btn ${pageNumber===1?'active':''}">1</button>
        <button class="page-btn ${pageNumber===2?'active':''}">2</button>
        <button class="page-btn ${pageNumber===3?'active':''}">3</button>
        <button class="page-btn ${pageNumber===4?'active':''}">4</button>

        <span class="dots"> . . . </span>

        <button class="page-btn">${totalPokemonPages}</button>
        
        <span>
            <button class="arrow-btn" id="next-arrow-btn">&rarr;</button>
        </span>

    `;
  }

  else if(pageNumber > totalPokemonPages-3 && pageNumber <= 52){
    pagesHtml = `
      <span>
            <button class="arrow-btn" id="prev-arrow-btn">&larr;</button>
        </span>
        
        <button class="page-btn">1</button>

        <span class="dots"> . . . </span>

        <button class="page-btn ${pageNumber===totalPokemonPages-3?'active':''}">${totalPokemonPages-3}</button>
        <button class="page-btn ${pageNumber===totalPokemonPages-2?'active':''}">${totalPokemonPages-2}</button>
        <button class="page-btn ${pageNumber===totalPokemonPages-1?'active':''}">${totalPokemonPages-1}</button>
        <button class="page-btn ${pageNumber===totalPokemonPages?'active':''}">${totalPokemonPages}</button>

        <span>
            <button class="arrow-btn" id="next-arrow-btn">&rarr;</button>
        </span>

    `;
  }

   else if(pageNumber >= 4 && pageNumber <= totalPokemonPages-3){
    pagesHtml = `
      <span>
            <button class="arrow-btn" id="prev-arrow-btn">&larr;</button>
        </span>
        <button class="page-btn">1</button>
        <span class="dots"> . . . </span>

        <button class="page-btn">${pageNumber-1}</button>
        <button class="page-btn active">${pageNumber}</button>
        <button class="page-btn">${pageNumber+1}</button>
        
        <span class="dots"> . . . </span>

        <button class="page-btn">${totalPokemonPages}</button>
        
        <span>
            <button class="arrow-btn" id="next-arrow-btn">&rarr;</button>
        </span>

    `;
   }
   
  const pagination = document.getElementById('pagination-div-js');
  pagination.innerHTML=pagesHtml;


// after generating pagination HTML make them interactive
  const pageBtn = document.querySelectorAll('.page-btn');

  pageBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      if(pageNumber <= totalPokemonPages){
        
        pageBtn.forEach((b)=>{b.classList.remove('active')});
        e.target.classList.add('active');

        renderPokemonCards(e.target.innerHTML);
        paginationLoads(e.target.innerHTML);
      }
    })
  });

// logic for arrow buttons interaction
  const arrowBtn = document.querySelectorAll('.arrow-btn');
  arrowBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{

      if(btn.id === "next-arrow-btn"){
        if(pageNumber<totalPokemonPages){
          pageNumber++;
      
          pageBtn.forEach((b)=>{b.classList.remove('active')

            if(b.innerHTML === pageNumber){
              b.classList.add('active');
            }
          });

          paginationLoads(pageNumber);
          renderPokemonCards(pageNumber);

        }  
      }else{
        if(pageNumber > 1){
          pageNumber--;
      
          pageBtn.forEach((b)=>{b.classList.remove('active')

            if(b.innerHTML === pageNumber){
              b.classList.add('active');
            }
          });

          paginationLoads(pageNumber);
          renderPokemonCards(pageNumber);
        }
        
      } 

    })

  })
}

// loading first page when website is open, also when reload fisrt page will appear again
let page = 1;
paginationLoads(page);
renderPokemonCards(page);