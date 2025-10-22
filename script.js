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

// get all the tip buttons
const selectedTipsArray = [...document.querySelectorAll(".tip-option")];

// custom tip button

const customTipInput = document.querySelector("#custom-input");

console.log(customTipInput);
// ResultsValues

const TotalTipResult = document.querySelector(".total-tip-amount-number");
const totalResult = document.querySelector(".total-number");

//Reset Values button

const resetValuesBtn = document.querySelector(".reset-btn");

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

// handle click for custom tip

customTipInput.addEventListener("input", (e) => onTipChange(e));

function onBillAmountChange(e) {
  //ensures decimal places
  userInputtedBillValue = parseFloat(e.target.value);

  userInputs[0] = userInputtedBillValue;

  checkAllInputs();

  return userInputtedBillValue;
}

// run this function when change to Number of People Input
function onPeopleChange(e) {
  userInputtedNumberOfPeopleValue = parseInt(e.target.value);

  userInputs[1] = userInputtedNumberOfPeopleValue;

  cantBeZero(userInputtedNumberOfPeopleValue);

  checkAllInputs();

  return userInputtedNumberOfPeopleValue;
}

//run this function when tip value changes
function onTipChange(e) {
  //This either detects the text from the percentage buttons or the user inputted value
  selectedTip = parseFloat(e.target.innerText || e.target.value);

  userInputs[2] = selectedTip;
  checkAllInputs();
}

//calculate final tip total
function calculateTip() {
  let finalTipAmount = parseFloat(
    userInputtedBillValue * (userInputs[2] / 100).toFixed(2)
  );

  totalPerPerson(finalTipAmount);
}

// calculate total amount and total tip amount per person
function totalPerPerson(finalTip) {
  let totalAmountPerPerson =
    (userInputtedBillValue + finalTip) / userInputtedNumberOfPeopleValue;

  let totalTipAmountPerPerson = parseFloat(
    finalTip / userInputtedNumberOfPeopleValue
  );

  updateResults(totalTipAmountPerPerson, totalAmountPerPerson);
}

// function checks if all values in userInputs aren't 0 and then runs the function to calculate the tip and total
function checkAllInputs() {
  console.log("checking all inputs");

  console.log(userInputs);
  const allInputsValid = userInputs.every(
    (value) => value > 0 && !isNaN(value)
  );

  if (allInputsValid) {
    calculateTip();
  } else return;
}
//
//
//
//
//
//
//UI

//update total results UI

function updateResults(totalTipAmountPerPerson, totalAmountPerPerson) {
  if (userInputtedBillValue !== 0 && userInputtedNumberOfPeopleValue !== 0) {
    TotalTipResult.textContent = `$${totalTipAmountPerPerson.toFixed(2)}`;
    totalResult.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  }

  //make reset button enabled
  resetValuesBtn.classList.remove("disabled");

  //remove disabled label for screen readers

  resetValuesBtn.setAttribute("aria-disabled", "false");
}

// Reset UI

//Reset UI on page load
// reset user inputs
window.onload = function () {
  billInputField.value = "";
  customTipInput.value = "";
  numberOfPeopleInputField.value = "";
};

//Reset UI on Click

resetValuesBtn.addEventListener("click", resetUI);

console.log(resetValuesBtn);

function resetUI() {
  // reset the rest button back to disabled
  resetValuesBtn.classList.add("disabled");

  // add disbaled attribute back to reset button for screen readers
  resetValuesBtn.setAttribute("aria-disabled", "true");
  //reset user inputs
  billInputField.value = "";
  customTipInput.value = "";
  numberOfPeopleInputField.value = "";

  selectedTipsArray.forEach((tip) => {
    tip.classList.remove("active");
  });
  //reset results
  TotalTipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
}

//Add active class to options
selectedTipsArray.forEach((tip) => {
  tip.addEventListener("click", activeClassToggle);
});

function activeClassToggle(e) {
  selectedTipsArray.forEach((tip) => {
    tip.classList.remove("active");
  });

  e.currentTarget.classList.add("active");
}

// function to make sure user doesn't make people number 0

function cantBeZero(userInput) {
  if (userInput === 0) {
    document
      .querySelector("#number-of-people-wrapper")
      .classList.add("rejected");
  } else
    document
      .querySelector("#number-of-people-wrapper")
      .classList.remove("rejected");
}
