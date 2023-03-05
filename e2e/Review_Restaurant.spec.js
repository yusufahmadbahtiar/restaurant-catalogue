const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Reviewing a Restaurant', async ({ I }) => {
  I.wait(5);
  I.waitForElement('.restaurants-item');
  I.seeElement('.restaurants-item__name a');
  I.click(locate('.restaurants-item__name a').first());
  I.wait(5);

  const timeStamp = Date.now();
  const nameOfReviewer = `Reviewer ${timeStamp}`;
  const reviewContent = `Review ${timeStamp}`;

  I.seeElement('#review-form');

  I.fillField('#name', nameOfReviewer);
  I.fillField('#review', reviewContent);
  I.click('button[type="submit"]');
  I.wait(10);

  const submittedNameOfReviewer = await I.grabTextFrom(locate('.review-container .review-consumer-name').last());
  const submittedReviewContent = await I.grabTextFrom(locate('.review-content').last());

  assert.strictEqual(nameOfReviewer, submittedNameOfReviewer);
  assert.strictEqual(reviewContent, submittedReviewContent);
});
