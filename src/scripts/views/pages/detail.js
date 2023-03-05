import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPageLoaderTemplate, createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FormReviewInitiator from '../../utils/form-review-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    document.querySelector('#loader').innerHTML = createPageLoaderTemplate.show();
    const html = `
      <div class="content">
        <h2 class="content__heading">Detail Restaurant</h2>
        <div id="restaurant" class="restaurant"></div>
      </div>    
    `;
    return html;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        rating: restaurant.rating,
        pictureId: restaurant.pictureId,
        description: restaurant.description,
      },
    });

    FormReviewInitiator.init({
      form: document.querySelector('#review-form'),
      container: document.querySelector('#review-container'),
    });

    createPageLoaderTemplate.remove();
  },
};

export default Detail;
