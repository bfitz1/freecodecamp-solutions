// DOM Elements
const number_input = document.getElementById('number');
const convert_btn = document.getElementById('convert-btn');
const output = document.getElementById('output');

// Integer -> String
// Converts an arabic numeral in the range [1, 3999] to its roman numeral
// equivalent. Numbers outside this range are not supported.
const to_roman_numerals = (number) => {
    const numerals = [
        { roman:  'M', arabic: 1000 },
        { roman: 'CM', arabic:  900 },
        { roman:  'D', arabic:  500 },
        { roman: 'CD', arabic:  400 },
        { roman:  'C', arabic:  100 },
        { roman: 'XC', arabic:   90 },
        { roman:  'L', arabic:   50 },
        { roman: 'XL', arabic:   40 },
        { roman:  'X', arabic:   10 },
        { roman: 'IX', arabic:    9 },
        { roman:  'V', arabic:    5 },
        { roman: 'IV', arabic:    4 },
        { roman:  'I', arabic:    1 },
    ];

    let result = [];
    let i = 0;
    while (number > 0 && i < numerals.length) {
        if (number >= numerals[i].arabic) {
            result.push(numerals[i].roman);
            number -= numerals[i].arabic;
        } else {
            i += 1;
        }
    }

    return result.join('');
};

// Note: This isn't very robust ()
convert_btn.addEventListener('click', () => {
    const number = parseInt(number_input.value);
    
    if (isNaN(number)) {
        output.textContent = 'Please enter a valid number';
    } else if (number < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
    } else if (number > 3999) {
        output.textContent = 'Please enter a number less than or equal to 3999';
    } else {
        output.textContent = to_roman_numerals(number);
    }
});