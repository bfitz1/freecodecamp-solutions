// Grab DOM elements.
const text_input = document.getElementById('text-input');
const check_btn = document.getElementById('check-btn');
const result = document.getElementById('result');

check_btn.addEventListener('click', (event) => {
    event.preventDefault();

    const word = text_input.value.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    if (word === "") {
        alert("Please input a value");
        return;
    }

    const reversed = word.split('').reverse().join('');
    if (word === reversed) {
        result.textContent = `${text_input.value} is a palindrome.`;
    } else {
        result.textContent = `${text_input.value} is not a palindrome.`;
    }
});