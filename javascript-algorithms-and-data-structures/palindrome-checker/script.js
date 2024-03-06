// Grab DOM elements.
const text_input = document.getElementById('text-input');
const check_btn = document.getElementById('check-btn');
const result = document.getElementById('result');

check_btn.addEventListener('click', (event) => {
    event.preventDefault();
    result.innerHTML = '';

    const word = text_input.value.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    if (word === "") {
        alert("Please input a value");
        return;
    }

    const word_element = document.createElement('span');
    word_element.classList.add('word');
    word_element.textContent = text_input.value;


    const reversed = word.split('').reverse().join('');
    if (word === reversed) {
        result.appendChild(word_element);
        result.appendChild(document.createTextNode(' is a palindrome.'));
    } else {
        result.appendChild(word_element);
        result.appendChild(document.createTextNode(' is not a palindrome.'));
    }
});