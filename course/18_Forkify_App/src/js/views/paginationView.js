import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    // NB use event delegation because there are 2 buttons but we don't want to
    // NB listen to each of them individually
    // NB so we will add the event listener to the common parent element
    // NB the .closest() method is a bit like querySelector but insted of
    // NB searching down in the DOM tree (i.e. for children)
    // NB it searches up in the tree (i.e. it looks for parents)
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest("btn--inline");
      console.log(btn);
      // TODO lecture 299 22:27
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    console.log(currentPage);

    // page 1 and other pages
    if (currentPage === 1 && numPages > 1) {
      console.log("page 1, others");
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      console.log("last page");
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // other pages
    if (currentPage < numPages) {
      console.log("other pages");
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // page 1 and no other pages (all results fit in one page)
    // if (currentPage === 1 && numPages <= 1) {
    //   console.log("page 1, no other pages");
    //   return "";
    // }
    // the code above can also be (because if it does not match any of the conditions above, it must be this one by exclusion)
    return "";
  }
}

export default new PaginationView();
