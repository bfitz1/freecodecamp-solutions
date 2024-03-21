// Given by fCC; just remember these are declared using `let` so fCC's
// tests work.
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// DOM elements
const change_due = document.getElementById('change-due');
const cash_input = document.getElementById('cash');
const purchase_btn = document.getElementById('purchase-btn');

// Sucks that I got saddled with using floating-point numbers instead
// of 
const currency_ref = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100,
};

// Maybe this is too dense?
const calculate_change = (cash) => cid.reduceRight(([remaining, drawer, change], [name, amount]) => {
    const unit = currency_ref[name];
    const cash_unit = parseFloat((Math.floor(remaining / unit) * unit).toFixed(2));
    if (remaining >= unit && amount > 0) {
        const x = Math.min(cash_unit, amount);
        return [
            parseFloat((remaining - x).toFixed(2)),
            [[name, parseFloat((amount - x).toFixed(2))]].concat(drawer),
            change.concat([[name, x]])
        ];
    } else {
        return [remaining, [[name, amount]].concat(drawer), change];
    }
}, [cash, cid, []]);

purchase_btn.addEventListener('click', () => {
    const cash = parseFloat(cash_input.value);
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else if (cash === price) {
        change_due.textContent = 'No change due - customer paid with exact cash';
    } else {
        const [remaining, drawer, change] = calculate_change(parseFloat((cash - price).toFixed(2)));
        const funds = drawer.reduce((acc, [name, amount]) => acc + amount, 0);

        if (remaining > 0) {
            change_due.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        } else if (remaining === 0 && funds === 0) {
            change_due.innerHTML = '<p>Status: CLOSED</p>'
            change_due.innerHTML += change.map(([name, amount]) => {
                return `<p>${name}: $${amount}</p>`
            }).join('');
        } else if (remaining === 0 && funds > 0) {
            change_due.innerHTML = '<p>Status: OPEN</p>'
            change_due.innerHTML += change.map(([name, amount]) => {
                return `<p>${name}: $${amount}</p>`
            }).join('');
        } else {
            console.error(`Something weird happened: Remaining: ${remaining}, funds: ${funds}`);
        }
    }
});