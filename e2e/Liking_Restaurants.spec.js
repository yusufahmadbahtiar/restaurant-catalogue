const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.wait(5);
  I.waitForElement('#empty');
  I.seeElement('empty-favorite');
  I.see('Favorite restaurant still empty', '.empty-favorite__tag');

  I.amOnPage('/');
  I.wait(5);
  I.waitForElement('.restaurants-item');
  I.seeElement('.restaurants-item__name a');

  const firstItemRestaurant = locate('.restaurants-item__name a').first();
  const firstItemRestaurantTitle = await I.grabTextFrom(firstItemRestaurant);
  I.click(firstItemRestaurant);
  I.wait(5);
  I.waitForElement('.restaurant-detail');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.wait(5);
  I.seeElement('.restaurants-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurants-item__name');

  assert.strictEqual(firstItemRestaurantTitle, likedRestaurantTitle);
});
