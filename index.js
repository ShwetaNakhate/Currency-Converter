const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap-btn");

updateRate();

function updateRate() {
    exchangeRateEl.innerText = "Fetching rate...";

    fetch(`https://v6.exchangerate-api.com/v6/372417daaff60d906483aa7c/latest/${currencyFirstEl.value}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[currencySecondEl.value];
            exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${rate} ${currencySecondEl.value}`;
            worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
        })
        .catch(() => {
            exchangeRateEl.innerText = "Error fetching rate. Try again.";
        });
}

swapBtn.addEventListener("click", () => {
    const temp = currencyFirstEl.value;
    currencyFirstEl.value = currencySecondEl.value;
    currencySecondEl.value = temp;
    updateRate();
});

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);
