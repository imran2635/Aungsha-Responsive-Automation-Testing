const { expect } = require('@playwright/test');
const { env } = require('../config/env');

/**
 * Base class for all pages.
 * Other pages extend this class so they can reuse open/goto helpers.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} [baseUrl]
   */
  constructor(page, baseUrl = env.baseURL) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Open a path on the website.
   * We use domcontentloaded because the site keeps loading maps and ads.
   */
  async goto(path = '/', options = {}) {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
      ...options,
    });
  }

  async getTitle() {
    return this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  // Check that the browser URL looks right
  async expectUrl(pattern) {
    await expect(this.page).toHaveURL(pattern);
  }

  // Check that the browser title looks right
  async expectTitle(pattern) {
    await expect(this.page).toHaveTitle(pattern);
  }

  // Scroll until the element is in view
  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // Return true/false if an element is visible (does not fail the test)
  async isVisible(locator, timeout = 3_000) {
    return locator.isVisible({ timeout }).catch(() => false);
  }
}

module.exports = { BasePage };
