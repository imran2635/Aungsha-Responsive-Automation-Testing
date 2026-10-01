const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Referral Rewards — Screenshot 090158
 * URL: /en/dashboard/referral-rewards
 */
class ReferralRewardsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.referralRewards;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /Referral Rewards/i });
    this.referralsStat = page.getByText(/^Referrals$/i);
    this.successStat = page.getByText(/^Success$/i);
    this.cashbackStat = page.getByText(/^Cashback$/i);
    this.shareSection = page.getByText(/SHARE YOUR REFERRAL LINK/i);
    this.shareNowButton = page.getByRole('button', { name: /Share now/i });
    this.howItWorks = page.getByRole('heading', { name: /How it works/i });
    // Referral URL / code field shown in screenshot
    this.referralLinkField = page.locator('input[value*="ref="], input[readonly]').first()
      .or(page.getByText(/sign-up\?ref=/i));
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/referral-rewards/);
    await expect(this.heading).toBeVisible();
    await expect(this.shareNowButton).toBeVisible();
  }
}

module.exports = { ReferralRewardsPage };
