export let startPokemonGenerationLimit = 0;
export let endPokemonGenerationLimit = 1025; // 1025 value is total pokemon appeared in pokemon series it does not includes pokemon from games which are not part of series

export let totalPokemonPages = 52;


export function changeLimit(start, end){
  startPokemonGenerationLimit = start;
  endPokemonGenerationLimit = end;
}

export function changeTotalPages(pages){
  totalPokemonPages = pages;
}