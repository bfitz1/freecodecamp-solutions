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

    const sprite = document.getElementById('sprite');
    if (sprite) {
        sprite.remove();
    }
};

// This is a little clumsy. I'm sure I can clean this up some.
const populateFields = (data) => {
    const {name, id, weight, height, sprites, stats, types} = data;
    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

    // Is this easier than just setting all the fields manually? Not sure.
    const obj = {
        hp, attack, defense, specialAttack, specialDefense, speed
    };

    const img = document.createElement('img');
    img.id = 'sprite';
    img.src = sprites.front_default;
    pokemonDOM.id.after(img);

    // Handle id, weight and height separately for now
    pokemonDOM.name.textContent = name.toUpperCase();
    pokemonDOM.id.textContent = `#${id}`;
    pokemonDOM.weight.textContent = `Weight: ${weight}`;
    pokemonDOM.height.textContent = `Height: ${height}`;

    for (let [key, value] of Object.entries(obj)) {
        pokemonDOM[key].textContent = value.base_stat;
    }

    for (let t of types) {
        const el = document.createElement('span');
        el.classList.add('type');
        el.textContent = t.type.name.toUpperCase();
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
            clearFields();
            populateFields(data);
        })
        .catch((err) => alert('Pokémon not found'));
});