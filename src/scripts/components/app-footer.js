class AppFooter extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    const today = new Date();
    const year = today.getFullYear();

    this.innerHTML = `
      <p> Created With <i class="fa-solid fa-heart"></i> Copyright © ${year} - Restaurant Catalogue</p>
    `;
  }
}

customElements.define('app-footer', AppFooter);
