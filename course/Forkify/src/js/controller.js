import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Controller function for handling a recipe rendered on the main content of the page
 */
const controlRecipes = async function () {
  try {
    // 0) Get recipe id from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1) Render spinner
    recipeView.renderSpinner();

    // 2) Update results view (just highlights current recipe)
    resultsView.update(model.getSearchResultsPage());

    // 3) Update bookmarks (just highlights current recipe)
    bookmarksView.update(model.state.bookmarks);

    // 4) Load recipe
    await model.loadRecipe(id);

    // 5) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    recipeView.renderError();
  }
};

/**
 * Controller function for handling the search results
 */
const controlSearchResults = async function () {
  try {
    // 0) Render spinner
    resultsView.renderSpinner();

    // 1) Get search results
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    recipeView.renderError();
  }
};

/**
 * Controller function for handling the pagination
 * @param {Number} goToPage page number to display
 */
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

/**
 * Controller function that handles the rendering of new servings
 * @param {Number} newServings number of servings
 */
const controlServings = function (newServings) {
  // 1) Update the recipe servings
  model.updateServings(newServings);
  // 2) Update the recipe view
  recipeView.update(model.state.recipe);
};

/**
 * Controller function for handling the rendering of the bookmarks
 */
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controller function for handling the addition and removal of bookmarks
 */
const controlToggleBookmarks = function () {
  // Add or remove bookmark depending on whether the recipe has been bookmarked or not
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controller function for handling the functionality of inserting a custom recipe
 * @param {Object} newRecipe new recipe
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render recipe in bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close form window or success message
    setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`💥 💥 💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

/**
 * Function that initializes the app
 */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHanlderRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlToggleBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
