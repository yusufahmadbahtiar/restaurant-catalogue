class AppHero extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
    <div class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/responsive/hero-image_4-small.jpg">
        <img src="./images/heros/responsive/hero-image_4-large.jpg" alt="Hero">
      </picture>
      <h1 class="hero__heading">Restaurant Catalogue</h1>
      <p class="hero__tagline">Food is always a good idea.</p>
    </div>
    `;
  }
}

customElements.define('app-hero', AppHero);
