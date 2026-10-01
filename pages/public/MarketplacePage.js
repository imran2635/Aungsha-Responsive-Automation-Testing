const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { NavbarComponent } = require('../../components/shared/NavbarComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * Marketplace — Screenshot 085951
 * URL: /en/marketplace
 * Tabs: Browse | My Listings; cards with Buy Now.
 */
class MarketplacePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.marketplace;
    this.navbar = new NavbarComponent(page);
    this.cookies = new CookieConsentComponent(page);

    this.heading = page.getByRole('heading', { name: /All Projects/i });
    this.browseTab = page.getByRole('button', { name: /^Browse$/i })
      .or(page.getByRole('tab', { name: /^Browse$/i }));
    this.myListingsTab = page.getByRole('button', { name: /^My Listings$/i })
      .or(page.getByRole('tab', { name: /^My Listings$/i }));
    this.buyNowButtons = page.getByRole('link', { name: /^Buy Now$/i })
      .or(page.getByRole('button', { name: /^Buy Now$/i }));
  }

  async open() {
    await this.goto(this.path);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/marketplace/);
    await expect(this.heading).toBeVisible();
  }

  async openBrowse() {
    await this.browseTab.first().click();
  }

  async openMyListingsTab() {
    await this.myListingsTab.first().click();
  }

  async expectBuyNowVisible() {
    await expect(this.buyNowButtons.first()).toBeVisible();
  }
}

module.exports = { MarketplacePage };
