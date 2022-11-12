import icons from "url:../../img/icons.svg";
import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded! :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  closeWindow() {
    this._window.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  _openWindow() {
    this._renderForm();
    this._window.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this._openWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.closeWindow.bind(this));
    this._overlay.addEventListener("click", this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _renderForm() {
    const markup = `
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title*</label>
      <input value="" placeholder="Insert title..." required name="title" type="text" />
      <label>Image URL*</label>
      <input value="" placeholder="Insert Image URL..." required name="image" type="text" />
      <label>Publisher*</label>
      <input value="" placeholder="Insert publisher name..." required name="publisher" type="text" />
      <label>Prep time*</label>
      <input value="" placeholder="Insert preparation time..." required name="cookingTime" type="number" />
      <label>Servings*</label>
      <input value="" placeholder="Insert number of servings..." required name="servings" type="number" />
      <label>URL*</label>
      <input value="" placeholder="Insert URL..." required name="sourceUrl" type="text" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1*</label>
      <input
        value=""
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        value=""
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        value=""
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new AddRecipeView();
