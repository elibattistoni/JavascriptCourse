// NB with Parcel you can import all kind of assets (also images)
// the problem is that we have hard coded the path to the icons file to src/img/icons
// and if you run the project with npm run start it cannot find the icons because now they are in the dist folder in a new file
// therefore we need to tell Javascript that the icons file are those new files
// import icons from "../img/icons.svg"; // for Parcel 1
import icons from "url:../img/icons.svg"; // for Parcel 2
console.log(icons); // this is the path to the new icons file

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const renderSpinner = function (parentElement) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const markupRecipe = function (recipe) {
  const html = `
  <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map((ing) => {
          return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
        `;
        })
        .join("")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
  return html;
};

const showRecipe = async function () {
  try {
    /// STEP 0: Get recipe id from URL (take out the first character because it is #)
    // const id = window.location.hash.slice(1); // TODO remove comment
    // TODO REMOVE THIS LATER
    const id = "5ed6604591c37cdc054bc886";
    if (!id) return; // if there is no id simply return

    /// STEP 0: Render spinner
    renderSpinner(recipeContainer);
    /// STEP 1: Load recipe
    //# Request the data
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    //| since we are in an async function, it will stop code execution at this point because it encounters an await
    //| but it is not a problem because it is in an async function which runs in the background, so we are not blocking the main thread of execution

    //# Convert to json
    const data = await response.json();

    //# Throw error if bad request
    if (!response.ok)
      throw new Error(
        `Error in getting response: ${response.status} - ${response.statusText} - ${data.message}`
      );

    // console.log(response);
    // console.log(data);

    //# Create an object with renamed properties
    // let recipe = data.data.recipe;
    let { recipe } = data.data; //| with destructuring
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    /// STEP 2: Render recipe
    //# remove markup message
    recipeContainer.innerHTML = "";
    const markup = markupRecipe(recipe);
    //# insert into HTML: we have to use the insertAdjacentHTML method NB on the PARENT ELEMENT
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
    //
    //
    //
  } catch (err) {
    console.log(err);
    // alert(err)
  }
};

// load recipe when hash (with recipe id) in url changes and when window loads
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
// refactored:
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));

/*
https://forkify-api.herokuapp.com/v2

NOTE about displaying a recipe when a user clicks on one of the search results
| when a user clicks on a search result, the hash of the recipe changes (hash = # + recipe id)
| you can listen for the changing of the hash in the URL, take the hash, take the ide, and load the recipe with that id
*/
