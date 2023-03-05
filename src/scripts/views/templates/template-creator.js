import CONFIG from '../../globals/config';

const createPageLoaderTemplate = {
  show() {
    document.querySelector('#mainContent').style.display = 'none';
    return `
      <div class="loader"></div>
    `;
  },
  remove() {
    setTimeout(() => {
      const loader = document.querySelector('.loader');

      if (loader) {
        loader.remove();
        document.querySelector('#mainContent').style.display = 'block';
      }
    }, 2000);
  },
};

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurants-item">
    <div class="restaurants-item__header">
      <img class="lazyload restaurants-item__header__poster" alt="${restaurant.name}"
        data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL('small') + restaurant.pictureId : 'https://fastly.picsum.photos/id/431/5000/3334.jpg?hmac=T2rL_gBDyJYpcr1Xm8Kv7L6bhwvmZS8nKT5w3ok58kA'}">
      <div class="restaurants-item__header__rating">
        <p><i class="fa-solid fa-star"></i> <span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
      <div class="restaurants-item__header__city">
        <p><i class="fa-solid fa-location-dot"></i> <span class="restaurant-item__header__rating__score2">${restaurant.city}</span></p>
      </div>
    </div>
    <div class="restaurants-item__content">
      <h3 class="restaurants-item__name"><a href="/#/detail/${restaurant.id}" title="${restaurant.name}">${restaurant.name}</a></h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <section class="restaurant-detail">  
    <div class="restaurant-detail__container">
      <img class="lazyload restaurant-detail__picture" data-src="${CONFIG.BASE_IMAGE_URL('large') + restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant-detail__content">
        <h1 class="restaurant-detail__title">${restaurant.name}</h1>
        <div class="restaurant-detail__category__container">
          <span class="restaurant-detail__category">Category : ${restaurant.categories.map((category) => `${category.name}`).join(', ')}</span>
        </div>
        <div class="restaurant-detail__rating">
          <i class="fa-solid fa-star"></i> ${restaurant.rating}
        </div>
        <div class="restaurant-detail__location">
          <i class="fa-solid fa-location-dot"></i> ${restaurant.address}, ${restaurant.city}
        </div>  
        <div class="restaurant-detail__description">
          <h2>Description</h2>
          <p>${restaurant.description}</p> 
        </div>
        <div id="likeButtonContainer"></div>
      </div>
    </div>
    
    <aside>
      <h2 class="content__heading">Menus</h2>
      <div class="detail-menu">
        <div class="menu-title-container">
          <i class="fa-solid fa-bowl-food"></i>
          <h2 class="menu-title">Food</h2>
        </div>
        <ul class="menu-list">
          ${restaurant.menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join(' ')}
        <ul>
      </div>
    
      <div class="detail-menu">
        <div class="menu-title-container">
          <i class="fa-solid fa-mug-saucer"></i>
          <h2 class="menu-title">Drinks</h2>
        </div>
        <ul class="menu-list">
          ${restaurant.menus.drinks.map((drink) => `<li class="menu-item">${drink.name}</li>`).join(' ')}
        </ul>
      </div>
    </aside>
  </section>

  <h2 class="content__heading">Consumer Review</h2>
  
  <section class="restaurant__review">
    <div id="review-container">
      <h2 class="content__heading">Review</h2>
        ${restaurant.customerReviews.map((review) => `
        <div class="review-container">
          <div class="review-photo-profile">
            <img src="./images/user/default.png" alt="consumer photo profile">
          </div>
          <div class="review-body">
            <h3 class="review-consumer-name">${review.name}</h3>
            <small class="review-date-post">${review.date}</small>
            <p class="review-content">${review.review}</p>
          </div>
        </div>
        `).join('')}
    </div>

    <div id="review-form-container">
    
    <h2 class="content__heading">Make a Review</h2>
    <div class="review-form-container">
      
      <form class="review-form" id="review-form">
        <input type="hidden" name="id" value="${restaurant.id}">
        <div class="review-form-element">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" autocomplete="off">
        </div>
        <div class="review-form-element">
          <label for="review">Review</label>
          <textarea name="review" id="review"></textarea>
        </div>
        <button type="submit" id="button-review">Add Review</button>
      </form>
    </div>
  </div>
  </section>
`;

const createReviewTemplate = (reviews) => {
  const review = reviews.customerReviews[reviews.customerReviews.length - 1];

  const html = document.createElement('div');
  html.classList.add('review-container');
  html.innerHTML = `
    <div class="review-photo-profile">
      <img class="lazyload" data-src="./images/user/default.png" alt="consumer photo profile">
    </div>
    <div class="review-body">
      <h3 class="review-consumer-name">${review.name}</h3>
      <small class="review-date-post">${review.date}</small>
      <p class="review-content">${review.review}</p>
    </div>    
  `;
  return html;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createPageLoaderTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createReviewTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
