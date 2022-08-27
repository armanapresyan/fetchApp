const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const p = document.getElementById("result");
const input = document.getElementById("input");
const convert = document.getElementById("convert");


const url = `https://api.exchangerate.host/symbols`;

async function getCurrencies() {
  let response = await fetch(url);
  let data = await response.json();

  for (let i in data.symbols) {
    let optionFrom = document.createElement("option");
    optionFrom.value = `${data.symbols[i].code}`;
    optionFrom.innerText = `
           ${data.symbols[i].code} -  ${data.symbols[i].description}
        `;
    fromEl.append(optionFrom);
    let optionTo = document.createElement("option");
    optionTo.value = `${data.symbols[i].code}`;
    optionTo.innerText = `
           ${data.symbols[i].code} -  ${data.symbols[i].description}
        `;
    toEl.append(optionTo);
  }
}

getCurrencies();

async function getRate(from, to, amount) {
  const url = `https://api.exchangerate.host/latest?base=${from}&amount=${amount}&symbols=${to}`;

  let response = await fetch(url);
  let data = await response.json();
  const rate = data.rates[to];

  p.innerHTML = `
     ${amount} ${from} = ${rate} ${to}
 `;
  return data;
}

convert.addEventListener("click", () =>
  getRate(fromEl.value, toEl.value, input.value)
);

