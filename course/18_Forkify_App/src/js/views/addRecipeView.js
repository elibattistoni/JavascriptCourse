import icons from "url:../../img/icons.svg";
import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded! :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  // NB since all that needs to happen is for the window to show, the controller does not need to interfere,
  // NB therefore we can run this function here, as soon as this object is created
  // NB what we will have to do in the controller is to import this object because otherwise our main script (i.e. the controller) will never execute it
  // NB and this object will never be created and the event listener will never be added
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // toggleWindow() {
  //   this._window.classList.toggle("hidden");
  //   this._overlay.classList.toggle("hidden"); // NB toggle adds a class if not present and removes a class if present
  // }

  closeWindow() {
    this._window.classList.add("hidden");
    this._overlay.classList.add("hidden");
    // location.reload(); // TODO find a method that if you click again on th add recipe button it will not display again the message
  }
  _openWindow() {
    this._renderForm();
    this._window.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _addHandlerShowWindow() {
    // this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    this._btnOpen.addEventListener("click", this._openWindow.bind(this));
  }

  _addHandlerHideWindow() {
    // this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    // this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    this._btnClose.addEventListener("click", this.closeWindow.bind(this));
    this._overlay.addEventListener("click", this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // NB this is the form, because we are inside a handler function and therefore this points to the element calling the method, i.e. the parent element
      const data = Object.fromEntries(dataArr);
      handler(data);
      // convert entries to an object
    });
  }

  _renderForm() {
    const markup = `
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input value="TEST23" required name="title" type="text" />
      <label>URL</label>
      <input value="TEST23" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input value="TEST23" required name="image" type="text" />
      <label>Publisher</label>
      <input value="TEST23" required name="publisher" type="text" />
      <label>Prep time</label>
      <input value="23" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input value="23" required name="servings" type="number" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        value="1,,Avocado"
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        value=",,salt"
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
