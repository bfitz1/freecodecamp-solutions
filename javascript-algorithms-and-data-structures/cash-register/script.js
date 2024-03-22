// Just remember that `price` and `cid` should be declared using `let`.
let price = 19.5;
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

// DOM elements.
const change_due = document.getElementById('change-due');
const cash_input = document.getElementById('cash');
const purchase_btn = document.getElementById('purchase-btn');
const price_p = document.getElementById('price');
const drawer_div = document.getElementById('drawer');

// The choice of floating-point values is a bit unfortunate.
const denominations = {
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

// Just because I'm using this everywhere.
const toMoney = (x) => parseFloat(x.toFixed(2));

const calculate_change = (cash) => cid.reduceRight(([remaining, drawer, changelist], [name, amount]) => {
    const denom = denominations[name];
    if (remaining >= denom && amount > 0) {
        let change = toMoney(Math.floor(remaining / denom) * denom);
        change = Math.min(change, amount);
        return [
            toMoney(remaining - change),
            [[name, toMoney(amount - change)]].concat(drawer),
            changelist.concat([[name, change]])
        ];
    } else {
        return [remaining, [[name, amount]].concat(drawer), changelist];
    }
}, [cash, [], []]);

document.addEventListener('DOMContentLoaded', () => {
    price_p.textContent = `Total: $${price.toFixed(2)}`;
    drawer_div.innerHTML = cid.map(([name, amount]) => {
        return `<p class="denom">${name}: $${amount}</p>`;
    }).join('');
});

purchase_btn.addEventListener('click', () => {
    const cash = parseFloat(cash_input.value);

    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
        return;
    } else if (cash === price) {
        change_due.innerHTML = '<p class="status">No change due - customer paid with exact cash</p>';
        return;
    }

    const [remaining, drawer, change] = calculate_change(toMoney(cash - price));
    const funds = drawer.reduce((acc, [name, amount]) => acc + amount, 0);

    if (remaining > 0) {
        change_due.innerHTML = '<p class="status">Status: INSUFFICIENT_FUNDS</p>';
    } else if (remaining === 0 && funds === 0) {
        change_due.innerHTML = '<p class="status">Status: CLOSED</p>'
        change_due.innerHTML += change.map(([name, amount]) => {
            return `<p class="change">${name}: $${amount}</p>`
        }).join('');
        drawer_div.innerHTML = drawer.map(([name, amount]) => {
            return `<p class="denom">${name}: $${amount}</p>`;
        }).join('');
        cid = drawer;
    } else if (remaining === 0 && funds > 0) {
        change_due.innerHTML = '<p class="status">Status: OPEN</p>'
        change_due.innerHTML += change.map(([name, amount]) => {
            return `<p class="change">${name}: $${amount}</p>`
        }).join('');
        drawer_div.innerHTML = drawer.map(([name, amount]) => {
            return `<p class="denom">${name}: $${amount}</p>`;
        }).join('');
        cid = drawer;
    } else {
        console.error(`Something weird happened: Remaining: ${remaining}, funds: ${funds}`);
    }
});