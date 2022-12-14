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
const displayMovements = function (movements, sort = false) {
  //## Empty the entire container before adding stuff
  containerMovements.innerHTML = ""; // textContent returns only the text inside an element; innerHTML returns also the HTML of that element
  // console.log(containerMovements.textContent);
  // console.log(containerMovements.innerHTML);

  //## Sort the movements
  // with .slice() you can create a copy of an array when you have to chain methods
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  //## Add one html element per bank movement
  sortedMovements.forEach(function (mov, i) {
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

  labelBalance.textContent = `${balance}???`;
};

// calcDisplayBalance(account1.movements); // LECTURE, COMMENTED FOR APP!!

const calcDisplayBalance2 = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}???`;
};
//==============================================================================
//## Calculate and display summary
//==============================================================================
const calcDisplaySummary = function (movements) {
  const summaryDeposit = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryDeposit}???`;

  const summaryWithdrawals = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryWithdrawals)}???`;

  const summaryInterest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${summaryInterest}???`;
};

// console.log(calcDisplaySummary(account1.movements)); // LECTURE, COMMENTED FOR APP!!

const calcDisplaySummary2 = function (account) {
  const summaryDeposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryDeposit}???`;

  const summaryWithdrawals = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryWithdrawals)}???`;

  const summaryInterest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${summaryInterest}???`;
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

const updateUI = function (currentAccount) {
  // display movements
  displayMovements(currentAccount.movements);
  // display balance
  calcDisplayBalance2(currentAccount);
  // display summary
  calcDisplaySummary2(currentAccount);
};

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

    updateUI(currentAccount);

    // Clear input fields: the form buttons: remove focus and empty form
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // remove focus and blinking bar
  }
});
//NB the button in a form element: the default behavior in HTML when we click a Submit button, is for the page to reload
// we need to stop that from happening using .preventDefault()
//NB another cool feature of HTML forms is that when you hit enter, it automatically triggers a click event on the submit button

//==============================================================================
//## Implementing transfers from noe user to another
//==============================================================================
btnTransfer.addEventListener("click", function (e) {
  //prevent default behavior
  e.preventDefault();

  // get info from form
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // clear fields
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // reveiverAcc?. if the receiver account exists
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // do the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
});
//==============================================================================
//## Request loan (with some method)
//==============================================================================
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // add movement
    currentAccount.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

//==============================================================================
//## .Closing an account (the findIndex method)
//==============================================================================
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // check credentials (if user is correct and pin is correct)
  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    console.log("Close account -- correct credentials");
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // delete account
    accounts.splice(index, 1);

    // hide ui
    containerApp.style.opacity = 0;
  }

  // clear fields
  inputClosePin.value = inputCloseUsername.value = "";
  inputClosePin.blur();
  inputCloseUsername.blur();
});

//==============================================================================
//## Sorting movements functionality
//==============================================================================
// btnSort.addEventListener("click", function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, true);
// });
//NB in this case when you click the sort button, it sorts the movements, but if you click it again nothing happens
// how to solve this?
//~ we will use a STATE VARIABLE which will monitor if we are currently sorting the movements or not
//~ this state variable needs to live outside the callback function for the addeventlistener on the btnsort element
let sorted = false; // because at the beginning the array is not sorted
// and if here it is false, inside the callback function it should be the opposite, i.e. true
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); //! returns the opposite
  sorted = !sorted;
});
// if it is already sorted (true), then we want it back to its original state, i.e. false

//==============================================================================
//## Getting an array of elements
//==============================================================================
// IMPORTANT
// this is for getting the movements only if you are logged in and you hover over the balance

labelBalance.addEventListener("mouseover", function () {
  // const movementsUI = Array.from(
  //   document.querySelectorAll(".movements__value")
  // );
  // const values = movementsUI.map((el) => el.textContent.replace("???", ""));

  //~ the Array.from() method has the second argument a mapping callback
  // so the code above can be merged into:
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => el.textContent.replace("???", "")
  );
  console.log(movementsUI);
  //NB the .map method will not work if you do not do Array.from()
  // i.e. it will not work if you call it directly on document.querySelectorAll(".movements__value")
  //NB document.querySelectorAll(".movements__value") is a NodeList i.e. an array like structure
  // and this array like structure can be easily converted into an array with Array.from()

  // another way of creating an array from a NodeList is
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
  // but then you have to do the mapping separately
  console.log(movementsUI2);
});

//==============================================================================
//## TODO "Array methods in practice" (more exercises) -- skipped for now
//==============================================================================
