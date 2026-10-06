import { startPokemonGenerationLimit, endPokemonGenerationLimit, totalPokemonPages, changeTotalPages } from "./config.js";

import { renderPokemonCards } from "./pokemon.js";

// loads pagination according to page number and pokemons
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
