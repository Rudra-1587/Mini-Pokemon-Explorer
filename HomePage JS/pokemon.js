import { startPokemonGenerationLimit, endPokemonGenerationLimit, totalPokemonPages, changeTotalPages } from "./config.js";

// fetch data from PokeAPI
export async function pokemonFetch(value){
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
export async function renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, currentPage){

  const loader = document.getElementById('loader');

  const pokemonGrid = document.getElementById("pokemon-grid");
  let pokemonCards = "";

  const offset = startPokemonGenerationLimit+((currentPage-1)*20); 

  try{

    loader.style.display = "flex";
    pokemonGrid.style.display = "none";
    
    const data = await pokemonFetch(offset);
    console.log(data);

    for(const element of data.results){
      const data = await pokemonFetch(element.name);

      console.log(data);
      const id = data.id;
      const pokemon = data.name;
      const image = data.sprites.front_default;

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

// loads pagination according to page number
export function paginationLoads(page){
  let pageNumber = Number(page);

  const totalPages = Math.ceil( ( endPokemonGenerationLimit - startPokemonGenerationLimit ) /20 );

  changeTotalPages(totalPages)
  console.log(totalPokemonPages);

  let pagesHtml = "";
  if(totalPokemonPages <= 6){
     let leftArrowHtml=`
    
        <span>
            <button class="arrow-btn" id="prev-arrow-btn">&larr;</button>
        </span>
    `;

    let buttonGenerationHtml=``;
    for(let i = 1; i <= totalPokemonPages; i++){
      buttonGenerationHtml+=`
        <button class="page-btn ${pageNumber===i?'active':''}">${i}</button>
      `;
    }

    let rightArrowHtnl=`
        <span>
            <button class="arrow-btn" id="next-arrow-btn">&rarr;</button>
        </span>
    `;

    pagesHtml=leftArrowHtml+buttonGenerationHtml+rightArrowHtnl;
  }
  else if(pageNumber < 4 ){
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

  else if(pageNumber > totalPokemonPages-3 && pageNumber <= totalPokemonPages){
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
      
        let currentPage = e.target.innerHTML;

        paginationLoads(currentPage);
        renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, currentPage);
        
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
          renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, pageNumber);

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
          renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, pageNumber);
          
        }
        
      } 

    })

  })
}

// loading first page when website is open, also when reload the browser, fisrt page will appear again
let page = 1;
paginationLoads(page);
renderPokemonCards(startPokemonGenerationLimit, endPokemonGenerationLimit, page);