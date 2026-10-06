
import { pokemonFetchList, pokemonFetchByUrl } from "./PokemonData.js";

// create pokemon cards 
export async function renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, currentPage){

  const loader = document.getElementById('loader');

  const pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = "";

  const offset = startPokemonGenerationLimit+((currentPage-1)*20); 
  console.log(offset)
  try{

    loader.style.display = "flex";
    pokemonGrid.style.display = "none";
    
    const data = await pokemonFetchList(offset);
    console.log(data);

    const pokemonData = await Promise.all(
      data.results.map(element => pokemonFetchByUrl(element.url))
    );

    for(const element of pokemonData){
      // const data = await pokemonFetch(element.name);

      console.log(element);
      const id = element.id;
      const pokemon = element.name;
      const image = element.sprites.front_default;

      if(id >= startPokemonGenerationLimit && id <= endPokemonGenerationLimit){
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
      else{
        break;
      }
    };
    
    pokemonGrid.innerHTML=pokemonCards;
      
  }catch(error){
    console.error(error);
  }
  finally{
    loader.style.display = "none";
    pokemonGrid.style.display = "grid";
  }

}



