const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

const decimalToBinary = (input) => {
    let binary = '';

    result.innerText = binary;
};

const checkUserInput = () => {
    if (!numberInput.value || isNaN(parseInt(numberInput.value))) {
        alert('Please provide a decimal number');
        return;
    }
    decimalToBinary(parseInt(numberInput.value));
    numberInput.value = '';
};

convertBtn.addEventListener('click', checkUserInput);

numberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkUserInput();
    }
});