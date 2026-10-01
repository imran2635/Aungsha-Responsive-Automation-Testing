const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Transactions list — Screenshot 090228
 * URL: /en/dashboard/transactions
 */
class TransactionsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.transactions;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /^Transactions$/i });
    this.subtitle = page.getByText(/Track your buying, returns, and withdrawal/i);
    this.summaryHeader = page.getByText(/TRANSACTION SUMMARY/i);
    this.viewButtons = page.getByRole('button', { name: /^View$/i })
      .or(page.getByRole('link', { name: /^View$/i }));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/transactions/);
    await expect(this.heading).toBeVisible();
  }

  /** Open first transaction detail row (Screenshot 090238) */
  async openFirstTransaction() {
    await this.viewButtons.first().click();
    await expect(this.page).toHaveURL(/\/en\/dashboard\/transactions\/.+/);
  }
}

module.exports = { TransactionsPage };
