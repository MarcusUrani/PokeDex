const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonPromisses = [];
const pokeUl = document.querySelector(".main__cards");

// Função que busca os dados do pokémon
const getPokemons = async (number) => {
  const requisition = await fetch(`${BASE_URL}${number}/`);
  const response = await requisition.json();
  return response;
};

//Criação do HTML
const constructHTML = async (pokemonPromisses) => {
  setTimeout;
  const pokemonList = await pokemonPromisses
    .map(
      (pokemon) =>
        `<div class="main__card">
             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"class="main__card__img"/>
             <h4 class="main__card__title" id="pokemon-name">${pokemon.name}</h4>
             <p class="main__card__text">Peso: ${pokemon.weight}</p>
             <p class="main__card__text">Altura: ${pokemon.height}</p>
           </div>`
    )
    .join("");
  pokeUl.innerHTML = pokemonList;
};

//Função de buscar dados de todos os pokémons
const getFirstData = async (inicialNumber, finalNumber) => {
  pokemonPromisses.splice((0)[pokemonPromisses.length]);
  //Loop para buscar dados de cada pokémon
  for (let i = inicialNumber; i <= finalNumber; i++) {
    pokemonPromisses.push(await getPokemons(i));
  }
  constructHTML(pokemonPromisses);
};

//Busca os dados dos pokémon por geração
const getGenData = async (genNumber) => {
  pokeUl.innerHTML =
    "<img class='main__loading' src='https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif'/>";
  if (genNumber === 0) getFirstData(1, 898);
  if (genNumber === 1) getFirstData(1, 151);
  if (genNumber === 2) getFirstData(152, 251);
  if (genNumber === 3) getFirstData(252, 386);
  if (genNumber === 4) getFirstData(387, 493);
  if (genNumber === 5) getFirstData(494, 649);
  if (genNumber === 6) getFirstData(650, 721);
  if (genNumber === 7) getFirstData(722, 809);
  if (genNumber === 8) getFirstData(810, 898);
};
