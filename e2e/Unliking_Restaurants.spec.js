const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('unliking one restaurant', async ({ I }) => {
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
  I.seeElement('.restaurants-item__name a');

  const firstItemRestaurantLike = locate('.restaurants-item__name a').first();
  const firstItemRestaurantTitleLike = await I.grabTextFrom(firstItemRestaurantLike);
  assert.strictEqual(firstItemRestaurantTitle, firstItemRestaurantTitleLike);
  I.click(firstItemRestaurantLike);
  I.wait(5);
  I.waitForElement('.restaurant-detail');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.wait(5);
  I.seeElement('.empty-favorite__tag');
  const onFav = await I.grabTextFrom('.empty-favorite__tag');
  assert.strictEqual(onFav, 'Favorite restaurant still empty');
});
