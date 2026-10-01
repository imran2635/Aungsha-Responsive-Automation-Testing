const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { SelectPaymentMethodModal } = require('../../components/modals/SelectPaymentMethodModal');
const { routes } = require('../../test-data/pages');

/**
 * Funds / My Points — Screenshots 090151 + 092028
 * URL: /en/dashboard/my-points
 *
 * 090151 = balances, how-to-withdraw, history
 * 092028 = after Withdraw → "Select Payment Method" modal (bKash methods)
 */
class FundsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.funds;
    this.sidebar = new SidebarComponent(page);
    // Modal composed here so Funds tests call fundsPage.paymentMethodModal.* only
    this.paymentMethodModal = new SelectPaymentMethodModal(page);

    // Green banner metrics from screenshot
    this.heading = page.getByRole('heading', { name: /^Funds$|^Points$/i });
    this.availableBalance = page.getByText(/Available Balance|Current Balance|Points/i).first();
    this.pendingWithdrawal = page.getByText(/Pending Withdrawal/i);
    this.balanceAmount = page.getByText(/BDT\s*[\d,]+/i).first();

    // Primary action that opens Select Payment Method modal (092028)
    this.withdrawButton = page.getByRole('button', { name: /^Withdraw$/i });

    this.howToWithdraw = page.getByRole('heading', { name: /How to withdraw\?/i });
    this.fundsHistory = page.getByRole('heading', { name: /Funds History|Latest Point History|Point History/i });
    this.goToPortfolioButton = page.getByRole('button', { name: /Go to My Portfolio/i })
      .or(page.getByRole('link', { name: /Go to My Portfolio/i }));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/my-points/);
    await expect(this.heading.or(this.withdrawButton).first()).toBeVisible();
  }

  /**
   * Click Withdraw and wait for the payment-method modal (Screenshot 092028).
   * Does not complete withdrawal — only opens the picker for UI assertions.
   */
  async openWithdrawPaymentMethodModal() {
    await expect(this.withdrawButton).toBeVisible();
    await this.withdrawButton.click();
    await this.paymentMethodModal.expectVisible();
  }
}

module.exports = { FundsPage };
