const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const GEN_URL = "https://pokeapi.co/api/v2/generation/";

const getPokemons = async (number) => {
  const requisition = await fetch(`${BASE_URL}${number}/`);
  const response = await requisition.json();
  return response;
};

const getPokemonsByGen = async (number) => {
  const requisition = await fetch(`${GEN_URL}${number}`);
  const response = await requisition.json();
  const data = response.pokemon_species;
  return data;
};

const getSpecies = async (url) => {
  const requisition = await fetch(url);
  const response = await requisition.json();
  return response;
};

const constructHTML = (pokemonPromisses) => {
  //Criação do HTML
  Promise.all(pokemonPromisses).then((pokemons) => {
    const pokemonList = pokemons.reduce((accumulator, pokemon) => {
      accumulator += `<div class="main__card">
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"class="main__card__img"/>
           <h4 class="main__card__title" id="pokemon-name">${pokemon.name}</h4>
           <p class="main__card__text">Peso: ${pokemon.weight}</p>
           <p class="main__card__text">Altura: ${pokemon.height}</p>
         </div>`;
      return accumulator;
    }, "");
    //Inserção do HTML na página
    const pokeUl = document.querySelector(".main__cards");
    pokeUl.innerHTML = pokemonList;
  });
};

//Função de buscar dados de todos os pokémons
const getFirstData = () => {
  const pokemonPromisses = [];
  //Loop para buscar dados de cada pokémon
  for (let i = 1; i <= 898; i++) {
    pokemonPromisses.push(getPokemons(i));
  }
  constructHTML(pokemonPromisses);
};

const getGenData = async (genNumber) => {
  const pokemonPromisses = [];
  pokemonPromisses.splice((0)[898]);
  const result = await getPokemonsByGen(genNumber);
  result.map(async (pokemon) => {
    console.log(await getSpecies(pokemon.url));
  });
  // constructHTML(pokemonPromisses);
};

getFirstData();
