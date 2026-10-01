const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Dashboard home — Screenshot 090112
 * URL: /en/dashboard
 * Greeting banner, quick links, investment activity, recent investments.
 * Requires authenticated session.
 */
class DashboardPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.dashboard;
    this.sidebar = new SidebarComponent(page);

    this.greeting = page.getByText(/Hello,/i);
    this.netWorthLabel = page.getByText(/Net Worth/i);
    this.quickLinks = page.getByText(/^My Portfolio$|^Buy Shares$|^Funds$/i);
    this.investmentActivity = page.getByRole('heading', { name: /Investment Activity/i });
    this.recentInvestment = page.getByRole('heading', { name: /Recent Investment/i });
    this.seeAllLink = page.getByRole('link', { name: /See All/i });
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard/);
    await this.sidebar.expectVisible();
    await expect(this.greeting.or(this.investmentActivity).first()).toBeVisible();
  }
}

module.exports = { DashboardPage };
