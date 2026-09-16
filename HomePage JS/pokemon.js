const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('pokemon-search');

async function pookemonFetch(pokemon){
  try{
    console.log('hello');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(!response.ok){
      throw new Error('Could not fetch data');
    }

    const data = await response.json();
    console.log(data);
  }catch(error){
    console.error(error);
  }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const query = searchInput.value.toLowerCase();
    
    if(query !== "") {
        console.log(`Searching for: ${query}`);

        pookemonFetch(query);
        
    }
});

// Also allow pressing Enter key to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});