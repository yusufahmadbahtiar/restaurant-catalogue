class EmptyFavorite extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class="empty-favorite__content">
        <p class="empty-favorite__tag"> Favorite restaurant still empty</p>
      </div>
    `;
  }
}

customElements.define('empty-favorite', EmptyFavorite);
