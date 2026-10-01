const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');

/**
 * Portfolio holding details — Screenshots 090301 / 090312
 * URL: /en/dashboard/my-portfolio/:id
 * Includes resale options + Ownership Certificate modal.
 */
class PortfolioDetailsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /Portfolio Details/i });
    this.viewCertificates = page.getByRole('button', { name: /View Certificates/i })
      .or(page.getByRole('link', { name: /View Certificates/i }));
    this.unitPrice = page.getByText(/Unit Price/i);
    this.sellHeading = page.getByText(/How would you like to sell\?/i);
    this.sellToAungsha = page.getByText(/Sell to Aungsha/i);
    this.goToMarketplace = page.getByText(/Go to marketplace/i);
    this.instantWithdraw = page.getByText(/Instant Withdraw/i);

    // Ownership Certificate modal (Screenshot 090312)
    this.certificateModalTitle = page.getByRole('heading', { name: /Ownership Certificate/i });
    this.certificateDownloadButtons = page.getByRole('button', { name: /download/i });
    this.closeModal = page.getByRole('button', { name: /close/i }).or(page.locator('[aria-label="Close"]'));
  }

  /** @param {string} holdingId */
  async open(holdingId) {
    await this.goto(`/en/dashboard/my-portfolio/${holdingId}`);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/my-portfolio\/.+/);
    await expect(this.heading.or(this.sellHeading).first()).toBeVisible();
  }

  async openCertificatesModal() {
    await this.viewCertificates.first().click();
    await expect(this.certificateModalTitle).toBeVisible();
  }
}

module.exports = { PortfolioDetailsPage };
