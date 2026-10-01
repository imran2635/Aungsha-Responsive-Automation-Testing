const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Wishlist — Screenshot 090141
 * URL: /en/dashboard/wishlist
 */
class WishlistPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.wishlist;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /Wishlist Projects/i });
    this.subtitle = page.getByText(/Check saved projects and invest faster/i);
    this.searchInput = page.getByPlaceholder(/Search project name/i);
    this.removeButtons = page.getByRole('button', { name: /Remove Wishlist/i });
    this.portfolioButton = page.getByRole('link', { name: /^My Portfolio$/i })
      .or(page.getByRole('button', { name: /^My Portfolio$/i }));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/wishlist/);
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { WishlistPage };
