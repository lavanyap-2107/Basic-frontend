// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");
// const btn = document.querySelector("form button");

// for(let select of dropdowns){
//     for(currCode in countryList){
//        let newOption = document.createElement("option");
//        newOption.value = currCode;
//        newOption.innerText = currCode;
//        if( select.name === "from" && currCode === "USD" ){
//         newOption.selected = "selected" ;
//        }else if (select.name === "to" && currCode ==="INR"){
//         newOption.selected = "selected";
//        }
//        select.append(newOption);
//     }
//     select.addEventListener("change", (evt)=>{
//         updateFlag(evt.target);
//     });
// }

// const updateFlag = (element) =>{
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// };

// const updateExchangeRate = async () =>{
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal === "" || amtVal < 1){
//         amtVal = 1;
//         amount.value = "1";
//     }
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()];

//     let finalAmount = amtVal * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

// };

// btn.addEventListener("click", (evt)=>{
//     evt.preventDefault();
//     updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    const newOption = document.createElement("option");

    newOption.value = currCode;
    newOption.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];

  const newSrc =
    `https://flagsapi.com/${countryCode}/flat/64.png`;

  const img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  const amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);

  if (amount.value === "" || amtVal < 1 || Number.isNaN(amtVal)) {
    amtVal = 1;
    amount.value = "1";
  }

  const fromCode = fromCurr.value.toLowerCase();
  const toCode = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${fromCode}.json`;

  try {
    msg.innerText = "Getting exchange rate...";

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const rate = data[fromCode][toCode];
    const finalAmount = amtVal * rate;

    msg.innerText =
      `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Currency conversion error:", error);

    msg.innerText =
      "Could not fetch the exchange rate. Please try again.";
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);