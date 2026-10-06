// fetch data from PokeAPI
export async function pokemonFetchByName(name){
  try{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    
    if(!response.ok){
      throw new Error('Error occured while fetching the data');
    }

    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
}

// fetch by offset
export async function pokemonFetchList(offset){
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    
    if(!response.ok){
      throw new Error('Error occured while fetching the data');
    }

    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
}

// fetch by url 
export async function pokemonFetchByUrl(url){
  try{
    const response = await fetch(url);
    
    if(!response.ok){
      throw new Error('Error occured while fetching the data');
    }

    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
} 

