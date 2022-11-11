import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again.";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(item) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        item.id === id ? "preview__link--active" : ""
      }" href="#${item.id}">
        <figure class="preview__fig">
          <img src="${item.image}" alt="${item.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${item.title}</h4>
          <p class="preview__publisher">${item.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();

/*
preview__link--active
<div class="preview__user-generated">
  <svg>
    <use href="${icons}#icon-user"></use>
  </svg>
</div>

*/
