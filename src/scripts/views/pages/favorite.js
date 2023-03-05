import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createPageLoaderTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

import '../../components/empty-favorite';

const Like = {
  async render() {
    document.querySelector('#loader').innerHTML = createPageLoaderTemplate.show();
    const html = `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurants</h2>
        <div class="restaurants" id="restaurants"></div>
        <div id="empty"></div>
      </div>
    `;
    return html;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    if (restaurants.length > 0) {
      restaurantsContainer.value = restaurants;
    } else {
      document.querySelector('#empty').innerHTML = '<empty-favorite></empty-favorite>';
    }

    createPageLoaderTemplate.remove();
  },
};

export default Like;
