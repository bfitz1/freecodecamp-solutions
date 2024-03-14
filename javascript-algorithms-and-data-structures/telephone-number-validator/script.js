// DOM Elements
const userinput = document.getElementById('user-input');
const checkbtn = document.getElementById('check-btn');
const clearbtn = document.getElementById('clear-btn');
const resultsdiv = document.getElementById('results-div');

const regexes = [
    /1 \d{3}-\d{3}-\d{4}/,      // 1 555-555-5555
    /1 \(\d{3}\) \d{3}-\d{4}/,  // 1 (555) 555-5555
    /1\(\d{3}\)\d{3}-\d{4}/,    // 1(555)555-5555
    /1 \d{3} \d{3} \d{4}/,      // 1 555 555 5555
    /\d{10}/,                   // 5555555555
    /\d{3}-\d{3}-\d{4}/,        // 555-555-5555
    /\(\d{3}\)\d{3}-\d{4}/,     // (555)555-5555
];

checkbtn.addEventListener('click', () => {
    if (userinput.value === '') {
        alert('Please provide a phone number');
        return;
    }

    const result = document.createElement('p');
    if (regexes.some((r) => r.test(userinput.value))) {
        result.textContent = `Valid US number: ${userinput.value}`;
    } else {
        result.textContent = `Invalid US number: ${userinput.value}`;
    }
    resultsdiv.appendChild(result);
});

clearbtn.addEventListener('click', () => {
    resultsdiv.textContent = '';
});