//user input fields

const billInputField = document.querySelector("#user-bill-input");

const numberOfPeopleInputField = document.querySelector(
  "#number-of-people-input"
);

//user input defaults
let userInputtedBillValue = 0;
let userInputtedNumberOfPeopleValue = 0;
let selectedTip = 0;

let userInputs = [
  userInputtedBillValue,
  userInputtedNumberOfPeopleValue,
  selectedTip,
];

const selectedTipsArray = [...document.querySelectorAll(".tip-option")];

//Add active class
selectedTipsArray.forEach((tip) => {
  tip.addEventListener("click", activeClassToggle);
});

function activeClassToggle(e) {
  selectedTipsArray.forEach((tip) => {
    tip.classList.remove("active");
  });

  e.currentTarget.classList.add("active");
}
// ResultsValues

const TotalTipResult = document.querySelector(".total-tip-amount-number");
const totalResult = document.querySelector(".total-number");

//Reset Values button

const resetValuesBtn = document.querySelector(".reset-btn");

// reset the bill text to 0 on load

window.onload = function () {
  billInputField.value = "";
  numberOfPeopleInputField.value = "";
};

// listen for bill input changes
billInputField.addEventListener("input", onBillAmountChange);

// listen for number of people input change

numberOfPeopleInputField.addEventListener("input", onPeopleChange);

// get the values of the tips and convert them into numbers
const selectedTipsAmount = selectedTipsArray.map((tip) => {
  return parseInt(tip.innerText);
});

// handle click event for individual tip

selectedTipsArray.forEach((tipButton) => {
  tipButton.addEventListener("click", (e) => onTipChange(e));
});

function onBillAmountChange(e) {
  //ensures decimal places
  userInputtedBillValue = parseFloat(e.target.value);

  userInputs[0] = userInputtedBillValue;

  checkAllInputs();

  return userInputtedBillValue;
}

function onPeopleChange(e) {
  userInputtedNumberOfPeopleValue = parseInt(e.target.value);

  userInputs[1] = userInputtedNumberOfPeopleValue;

  checkAllInputs();

  return userInputtedNumberOfPeopleValue;
}

function onTipChange(e) {
  selectedTip = parseFloat(e.target.innerText);

  userInputs[2] = selectedTip;
  checkAllInputs();
}

function calculateTip() {
  let finalTipAmount = parseFloat(
    userInputtedBillValue * (userInputs[2] / 100).toFixed(2)
  );

  totalPerPerson(finalTipAmount);
}

function totalPerPerson(finalTip) {
  let totalAmountPerPerson =
    userInputtedBillValue + finalTip * userInputtedNumberOfPeopleValue;

  let totalTipAmountPerPerson = parseFloat(
    finalTip / userInputtedNumberOfPeopleValue
  );

  updateResults(totalTipAmountPerPerson, totalAmountPerPerson);
}

// only calculate the tip when all inputs aren't 0
function checkAllInputs() {
  console.log("checking all inputs");

  console.log(userInputs);
  const allInputsValid = userInputs.every(
    (value) => value > 0 && !isNaN(value)
  );

  if (allInputsValid) {
    console.log(userInputs[2], "completed user inputs");
    calculateTip();
  } else return;
}

//UI

//update total results UI

function updateResults(totalTipAmountPerPerson, totalAmountPerPerson) {
  if (userInputtedBillValue !== 0 && userInputtedNumberOfPeopleValue !== 0) {
    TotalTipResult.textContent = `$${totalTipAmountPerPerson.toFixed(2)}`;
    totalResult.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  }
}

// Reset UI

resetValuesBtn.addEventListener("click", resetUI);

console.log(resetValuesBtn);

function resetUI() {
  //reset user inputs
  billInputField.value = "";
  numberOfPeopleInputField.value = "";

  selectedTipsArray.forEach((tip) => {
    tip.classList.remove("active");
  });
  //reset results
  TotalTipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
}
