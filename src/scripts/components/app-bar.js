class AppBar extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class="app-bar">
        <div class="app-bar__menu">
          <button id="hamburgerButton" aria-label="Open hamburger button"><i class="fa-solid fa-bars"></i></button>
        </div>
        <nav class="app-bar__navigation" id="navigationDrawer">
          <ul>
            <li><a href="/"><i class="fa-solid fa-house"></i> Home</a></li>
            <li><a href="#/favorite"><i class="fa-solid fa-star"></i> Favorite</a></li>
            <li>
              <a href="https://www.linkedin.com/in/yusuf-ahmad-bahtiar-2b228923a/" target="_blank" rel="noreferrer">
                <i class="fa-solid fa-circle-info"></i> About Us
              </a>
            </li>
          </ul>
        </nav>
        <div class="app-bar__brand">
          <h1>RESTOLOG</h1>
        </div>
      </div>    
    `;
  }
}

customElements.define('app-bar', AppBar);
