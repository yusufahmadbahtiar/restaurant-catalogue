import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPageLoaderTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    document.querySelector('#loader').innerHTML = createPageLoaderTemplate.show();
    const html = `
      <div class="content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div class="restaurants" id="restaurants"></div>
      </div>
    `;
    return html;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    createPageLoaderTemplate.remove();
  },
};

export default Home;
