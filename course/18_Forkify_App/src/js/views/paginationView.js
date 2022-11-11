import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    /*
    | use event delegation because there are 2 buttons but we don't want to
    | listen to each of them individually
    | so we will add the event listener to the common parent element
    | the .closest() method is a bit like querySelector but insted of
    | searching down in the DOM tree (i.e. for children)
    | it searches up in the tree (i.e. it looks for parents)

    | Now we need a way of knowing which is the page we need to go when we click on the button
    | We need a way for telling JS that it should display the results on page N
    | We need to establish a connection between the DOM and the code
    | We can do that with the custom data attribute
    | So we will create a data attribute on each of the buttons, and 
    | this data attribute will contain the page that we want to go to
    | so in the code we can read that data and make the application go to that page
    | in the code below we add the attribute 'data-goto'
    | and in this function we can get that attribute
    */

    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return; // todo comment to see this work
      // this prevents an error in the console, that you see if you click
      // outside of a button but still in this parent element

      const goToPage = +btn.dataset.goto;

      //| now we have to pass this number to the controller and in the controller
      //| we can use this number to render the results
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and other pages
    if (currentPage === 1 && numPages > 1) {
      //# manually added data-goto attribute to establish a connection between DOM and code
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      //# manually added data-goto attribute to establish a connection between DOM and code
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // other pages
    if (currentPage < numPages) {
      //# manually added data-goto attribute to establish a connection between DOM and code
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
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
