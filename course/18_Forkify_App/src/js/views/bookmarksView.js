import View from "./View.js";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
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

export default new BookmarksView();

/*

`<li class="preview">
  <a class="preview__link" href="#23456">
    <figure class="preview__fig">
      <img src="src/img/test-1.jpg" alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__name">
        Pasta with Tomato Cream ...
      </h4>
      <p class="preview__publisher">The Pioneer Woman</p>
    </div>
  </a>
</li>
`;

*/
