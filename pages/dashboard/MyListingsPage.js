const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * My Listings — Screenshot 090134
 * URL: /en/dashboard/sell-shares
 */
class MyListingsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.myListings;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /My Listings/i });
    this.investedProjects = page.getByText(/My Invested Projects/i);
    this.totalListingValue = page.getByText(/Total Listing Value/i);
    this.searchInput = page.getByPlaceholder(/Search by project or location/i);
    this.marketplaceButton = page.getByRole('link', { name: /^Marketplace$/i })
      .or(page.getByRole('button', { name: /^Marketplace$/i }));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/sell-shares/);
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { MyListingsPage };
