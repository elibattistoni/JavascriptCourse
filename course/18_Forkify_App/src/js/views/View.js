import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup; // NB for the bookmarks: instead of rendering the markup string to the dom, we return it as a markup string

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // we do the same two checks that there were in render
    // because once we update the data, then we want the view's data to become the new data
    // and we also want to generate some markup
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError(); // COMMENTED TO REMOVE THE ERROR

    this._data = data;
    const newMarkup = this._generateMarkup();
    // NB we create a new markup but we will not render it; instead, we compare the new markup (i.e. the new html) with the current html
    // NB then only change text and attributes that have actually changed from the current/old version
    // to do that, you need to convert the new markup string to a real DOM node object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // this will be like a virtual DOM, a DOM that is not really living on the page but which lives in our memory
    // and we can use this DOM as if it was the real DOM on our page
    const newElements = Array.from(newDOM.querySelectorAll("*")); // select all the elements contained in the new DOM
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    ); // this selects all the elements in the current view

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      // console.log(newEl.isEqualNode(curEl)); // this method compares the content of two nodes
      //# update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // select the child node with newEl.firstChild (this will return a node)
        // and we need to select the child node because it is the one that actually contains the text
        // becasue newEl is just an Element, it is an element node and not a text node, and the first child node is the text (NB cfr advanced DOM section)
        // NB https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
        // console.log("🍒", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //# update changed ATTRIBUTE
      // this replaces all the attributes in the current element with the attributes coming from the new element
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

// NB this time we export the class itself because we are not creating any instance of this view
