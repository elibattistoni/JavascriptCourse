import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was successfully uploaded! :)";

  // NB since all that needs to happen is for the window to show, the controller does not need to interfere,
  // NB therefore we can run this function here, as soon as this object is created
  // NB what we will have to do in the controller is to import this object because otherwise our main script (i.e. the controller) will never execute it
  // NB and this object will never be created and the event listener will never be added
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden"); // NB toggle adds a class if not present and removes a class if present
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
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

  _generateMarkup() {}
}

export default new AddRecipeView();
