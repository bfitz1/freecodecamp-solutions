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

const clearFields = () => {
    for (let key of Object.keys(pokemonDOM)) {
        pokemonDOM[key].innerHTML = '';
    }
};

const populateFields = (data) => {
    const {name, id, weight, height, sprites, stats, types} = data;
    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

    // Is this easier than just setting all the fields manually? Not sure.
    const obj = {
        name, hp, attack, defense, specialAttack, specialDefense, speed
    };

    // Handle id, weight and height separately for now
    pokemonDOM.id.textContent = `#${id}`;
    pokemonDOM.weight.textContent = `Weight: ${weight}`;
    pokemonDOM.height.textContent = `Height: ${height}`;

    for (let [key, value] of Object.entries(obj)) {
        pokemonDOM[key].textContent = value.base_stat;
    }

    for (let t of types) {
        const el = document.createElement('span');
        el.textContent = t.type.name;
        pokemonDOM.types.appendChild(el);
    }
};

searchButton.addEventListener('click', async () => {
    // Trim whitespace and force lowercase to make it a bit friendlier.
    const value = searchInput.value.trim().toLowerCase();

    fetch(pokemonURL.replace(/{name-or-id}/, value))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            populateFields(data);
        })
        .catch((err) => alert('Pokémon not found'));
});