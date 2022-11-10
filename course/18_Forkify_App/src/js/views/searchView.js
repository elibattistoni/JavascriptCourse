class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
    this._parentElement.querySelector(".search__field").blur();
  }

  addHandlerSearch(handler) {
    // NB when you submit a form, you have to prevent the default action otherwise the page is going to reload
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
