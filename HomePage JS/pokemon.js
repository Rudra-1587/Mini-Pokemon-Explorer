const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search');

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

async function renderPokemonCards(pageNumber){

  const pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = "";

  const offset = (pageNumber-1)*20;

  try{
    
    const data = await pokemonFetch(offset);
    console.log(data);

    for(const element of data.results){
      const data = await pokemonFetch(element.name);

      console.log(data);
      const id = data.id;
      const pokemon = data.name;
      const image = data.sprites.front_default;

      pokemonCards += `
        <div class="pokemon-card">
            <div class="card-image">
                <img src="${image}" alt="${pokemon}">
            </div>
            <h3 class="card-name">${pokemon}</h3>
            <p class="card-id">#${id}</p>
        </div>
      
      `;

      // console.log(id, pokemon, image);
    };

    
    pokemonGrid.innerHTML=pokemonCards;
      
  }catch(error){
    console.error(error);
  }

}
renderPokemonCards(1);

searchBtn.addEventListener('click', async(e) => {
    e.preventDefault();

    const query = searchInput.value.toLowerCase();
    
    if(query !== "") {
        console.log(`Searching for: ${query}`);

        const data = await pokemonFetch(query);
        console.log(data);

        searchInput.value = "";

        const id = data.id;
        const pokemon = data.name;
        const image = data.sprites.front_default;

        const pokemonGrid = document.getElementById("pokemon-grid").innerHTML = `
          <div class="pokemon-card">
            <div class="card-image">
                <img src="${image}" alt="${pokemon}">
            </div>
            <h3 class="card-name">${pokemon}</h3>
            <p class="card-id">#${id}</p>
        </div>

        `;
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