const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

//Função de buscar dados do pokémon
const getData = () => {
  const pokemonPromisses = [];

  //Loop para buscar dados de cada pokémon
  for (let i = 1; i <= 898; i++) {
    pokemonPromisses.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  //Criação do HTML
  Promise.all(pokemonPromisses).then((pokemons) => {
    const pokemonList = pokemons.reduce((accumulator, pokemon) => {
      accumulator += `<div class="main__card">
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
             pokemon.id
           }.png"class="main__card__img"/>
           <h4 class="main__card__title" id="pokemon-name">${pokemon.name}</h4>
           <p class="main__card__text">Peso: ${pokemon.weight}</p>
           <p class="main__card__text">Altura: ${pokemon.height}</p>
          <p class="main__card__text">${pokemon.types
            .map((typeInfo) => typeInfo.type.name)
            .join(" | ")}</p>
         </div>`;
      return accumulator;
    }, "");

    //Inserção do HTML na página
    const pokeUl = document.querySelector(".main__cards");
    pokeUl.innerHTML = pokemonList;
  });
};

getData();