const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * My Portfolio — Screenshot 090125
 * URL: /en/dashboard/my-portfolio
 */
class PortfolioPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.portfolio;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /My Portfolio/i });
    this.buyingAmount = page.getByText(/My Buying Amount/i);
    this.profitGain = page.getByText(/Profit Gain/i);
    this.searchInput = page.getByPlaceholder(/Search by project name/i);
    this.myListingsButton = page.getByRole('link', { name: /^My Listings$/i })
      .or(page.getByRole('button', { name: /^My Listings$/i }));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/my-portfolio/);
    await expect(this.heading).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }

  async search(projectName) {
    await this.searchInput.fill(projectName);
  }
}

module.exports = { PortfolioPage };
