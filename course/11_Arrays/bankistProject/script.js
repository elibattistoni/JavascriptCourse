"use strict";
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//==============================================================================
//## DOM manipulation
//==============================================================================
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//==============================================================================
//## Display movements
//==============================================================================
const displayMovements = function (movements) {
  //## Empty the entire container before adding stuff
  containerMovements.innerHTML = ""; // textContent returns only the text inside an element; innerHTML returns also the HTML of that element
  // console.log(containerMovements.textContent);
  // console.log(containerMovements.innerHTML);

  //## Add one html element per bank movement
  movements.forEach(function (mov, i) {
    //## Define what you want to insert in the HTML
    const type = mov > 0 ? "deposit" : "withdrawal";
    // template literals are amazing for creating multiline HTML templates
    // we need to replace the hard coded data with the hard coded data with the actual movements data
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    //## Insert the string into the HTML
    // now we have to attach the html to the container
    // input: 1) string of position in which we want to attach our html, 2) string of the html we watn to insert
    // look at thif function in the MDN for other input parameters
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // with "beforeend" they are added starting from the bottom (end) of the container
  });
};

// displayMovements(account1.movements); // LECTURE, COMMENTED FOR APP!!

//==============================================================================
//## Calculate and display balance
//==============================================================================
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${balance}€`;
};

// calcDisplayBalance(account1.movements); // LECTURE, COMMENTED FOR APP!!

//==============================================================================
//## Calculate and display summary
//==============================================================================
const calcDisplaySummary = function (movements) {
  const summaryDeposit = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryDeposit}€`;

  const summaryWithdrawals = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryWithdrawals)}€`;

  const summaryInterest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${summaryInterest}€`;
};

// console.log(calcDisplaySummary(account1.movements)); // LECTURE, COMMENTED FOR APP!!

const calcDisplaySummary2 = function (account) {
  const summaryDeposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryDeposit}€`;

  const summaryWithdrawals = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryWithdrawals)}€`;

  const summaryInterest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${summaryInterest}€`;
};

//==============================================================================
//## Computing Usernames
//==============================================================================

const createUsernameA = function (user) {
  const username = user
    .toLowerCase()
    .split(" ")
    .map((word) => word.at(0))
    .join("");
  return username;
};
console.log(createUsernameA("Steven Thomas Williams"));

// now we want to loop over the accounts array (which contains the objects of the users)
// and for each object add a username property
const accountsA = [...accounts];
accountsA.forEach(function (acc) {
  acc.username = createUsernameA(acc.owner);
});
console.log(accountsA);

//NB alternatively the teacher did

const createUsernameB = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.at(0))
      .join("");
  });
  //NB no need to return anything because with forEach you are producing a side effect, i.e. changing the original array inplace
};
createUsernameB(accounts);
console.log(accounts);

//==============================================================================
//## Return the account that matches a condition
//==============================================================================
// find an object in an array of objects based on some property
console.log("------- Return account that matches a condition -------");
console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

//==============================================================================
//## Login functionality
//==============================================================================
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // this prevents the form from submitting

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ?.pin read the pin property only if the currentAccount exists

    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // display movements
    displayMovements(currentAccount.movements);

    // display balance
    calcDisplayBalance(currentAccount.movements);

    // display summary
    calcDisplaySummary2(currentAccount);

    // Clear input fields: the form buttons: remove focus and empty form
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // remove focus and blinking bar
  }
});
//NB the button in a form element: the default behavior in HTML when we click a Submit button, is for the page to reload
// we need to stop that from happening using .preventDefault()
//NB another cool feature of HTML forms is that when you hit enter, it automatically triggers a click event on the submit button
