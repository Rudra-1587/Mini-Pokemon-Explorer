export let startPokemonGenerationLimit = 0;
export let endPokemonGenerationLimit = 1025; // 1025 value is total pokemon appeared in pokemon series it does not includes pokemon from games which are not part of series

export let totalPokemonPages = 52;

export const pokemonGenLimitArray = [
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


export function changeLimit(start, end){
  startPokemonGenerationLimit = start;
  endPokemonGenerationLimit = end;
}

export function changeTotalPages(pages){
  totalPokemonPages = pages;
}