const { expect } = require('@playwright/test');
const { assertNoHorizontalOverflow, isInViewport } = require('./responsive');
const { assertNoBrokenImages } = require('./images');

/**
 * Shared high-level assertions used across specs.
 */
async function assertPageBasics(page, { titlePattern, urlPattern } = {}) {
  if (urlPattern) await expect(page).toHaveURL(urlPattern);
  if (titlePattern) await expect(page).toHaveTitle(titlePattern);
}

async function assertLocatorVisibleInViewport(locator, message) {
  await expect(locator, message).toBeVisible();
  expect(await isInViewport(locator), message || 'Element should be in viewport').toBe(true);
}

async function assertHomepageHealth(page) {
  await assertNoHorizontalOverflow(page);
  await assertNoBrokenImages(page);
}

module.exports = {
  assertPageBasics,
  assertLocatorVisibleInViewport,
  assertHomepageHealth,
};
