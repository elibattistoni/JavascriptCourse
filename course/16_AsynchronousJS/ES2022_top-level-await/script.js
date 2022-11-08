import { cart } from "./myModule.js";
console.log("Importing module");

//######################################################
//= Asynchronous JavaScript 2022 Update: top-level await
//######################################################

/// TOP-LEVEL AWAIT
// from ES2022 we can now use the await keyword outside of async functions
// at least in MODULES (see section 17_ModernJS for an explanation of the modules)
// NB this is what is required to make top-level await work:
// <script defer src="script.js" type="module"></script>

// TODO uncomment to see this work
// TODO uncomment start
// console.log("Log cart BEFORE await...", cart);
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("Log cart AFTER await...", cart);
// TODO uncomment end

// NB as you can see, this blocks the execution of the entire module!
// this can be useful, but sometimes harmful especially if it is a long running task

/// many times we want to use data returned by an async function
const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  // console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// to get the fulfilled value, this is what we did so far
// NB not very clean
const lastPost = getLastPost();
console.log(lastPost); // returns a promise
lastPost.then((last) => console.log(last));

// best practice now we can use top-level await!
const lastPost2 = await getLastPost();
console.log(lastPost2);

// NB in these situations, top-level await is quite useful!

// IMPORTANT
/// if one module imports another module in which there is a top-level await,
/// then the importing module will wait for the imported module to finish the blocking code
/// the code in script.js will wait for the code in myModule.js to finish
/// so the top level await blocks the code not only in the module in which it is present, but also in the modules that import the module in which it is present
