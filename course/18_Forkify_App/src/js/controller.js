import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // get recipe id
    let id = window.location.hash.slice(1);
    if (!id) return;
    // render spinner
    recipeView.renderSpinner();
    // load recipe
    await model.loadRecipe(id); // NB an async function will return a promise that we then need to handle whenever we call that async function
    // render recipe
    recipeView.render(model.state.recipe);
    //| alternatively, from recipeVIew.js you could export the whole class
    //| but then here you could create as many views as you want (and we don't want that) + better to keep it simple here
    // if you did that, here you could write:
    // const recipeView = new RecipeView(model.state.recipe)
    //| but this recipeView.render(model.state.recipe) is much more descriptive and cleaner
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner for search results
    resultsView.renderSpinner();

    // 1) Get search results
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(6));

    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    recipeView.renderError();
  }
};

const controlPagination = function () {
  console.log("Pag controller");
};

const init = function () {
  recipeView.addHanlderRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
