// Endpoint to list all Pokémon.
const allPokemonURL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

// Endpoint template for a specific Pokémon.
const pokemonURL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}';

// DOM elements.
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonDOM = {
    name: document.getElementById('pokemon-name'),
    id: document.getElementById('pokemon-id'),
    weight: document.getElementById('weight'),
    height: document.getElementById('height'),
    types: document.getElementById('types'),
    hp: document.getElementById('hp'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    specialAttack: document.getElementById('special-attack'),
    specialDefense: document.getElementById('special-defense'),
    speed: document.getElementById('speed'),
};