// Endpoints for Pokémon API.
const allPokemonURL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
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

    document.getElementById('stats').classList.add('hide');
};

const populateFields = (data) => {
    // Flatten the data for easier processing.
    const {name, id, weight, height} = data;
    const spriteURL = data.sprites.front_default;
    const stats = data.stats.reduce((acc, x) => {
        // A less slick solution than I'd like because of camel casing.
        let key = x.stat.name;
        key = key == 'special-attack' ? 'specialAttack'
            : key == 'special-defense' ? 'specialDefense'
            : key;
        acc[key] = x.base_stat
        return acc;
    }, {});
    const types = data.types.map(x => x.type.name);

    const obj = Object.assign({
        name: name.toUpperCase(), 
        id: `#${id}`, 
        weight, 
        height,
    }, stats);

    for (let [key, value] of Object.entries(obj)) {
        pokemonDOM[key].textContent = value
    }

    // Types need to be displayed within new element.
    for (let t of types) {
        const el = document.createElement('span');
        el.classList.add('type', t);
        el.textContent = t.toUpperCase();
        pokemonDOM.types.appendChild(el);
    }

    // Sprites also need a new element.
    const img = document.createElement('img');
    img.id = 'sprite';
    img.src = spriteURL;
    document.getElementById('name').after(img);

    document.getElementById('stats').classList.remove('hide');
};

searchButton.addEventListener('click', async () => {
    // Trim whitespace and force lowercase to make it a bit friendlier.
    const value = searchInput.value.trim().toLowerCase();

    fetch(pokemonURL.replace(/{name-or-id}/, value))
        .then((res) => res.json())
        .then((data) => {
            clearFields();
            populateFields(data);
        })
        .catch((err) => alert('Pokémon not found'));
});