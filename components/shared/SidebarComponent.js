const { expect } = require('@playwright/test');

/**
 * Left dashboard sidebar (red box in your screenshot).
 * Order must match the live site from top to bottom:
 * Home → Dashboard → My Portfolio → My Listings → Wishlist →
 * Funds → Referral Rewards → Support → Transactions → My Profile
 *
 * Locators stay inside the sidebar only.
 * This avoids clicking Quick Links that use the same names.
 */
class SidebarComponent {
  /** Menu order from your screenshot (top to bottom) */
  static MENU_ORDER = [
    'Home',
    'Dashboard',
    'My Portfolio',
    'My Listings',
    'Wishlist',
    'Funds',
    'Referral Rewards',
    'Support',
    'Transactions',
    'My Profile',
  ];

  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Find the left menu that has both "Wishlist" and "My Profile"
    // (Quick Links row does not have both of these together)
    this.root = page
      .locator('aside, nav, [class*="sidebar"], [class*="Sidebar"]')
      .filter({ has: page.getByRole('link', { name: /^Wishlist$/i }) })
      .filter({ has: page.getByRole('link', { name: /^My Profile$/i }) })
      .first();

    // Same order as the screenshot
    this.homeLink = this.root.getByRole('link', { name: /^Home$/i });
    this.dashboardLink = this.root.getByRole('link', { name: /^Dashboard$/i });
    this.portfolioLink = this.root.getByRole('link', { name: /^My Portfolio$/i });
    this.myListingsLink = this.root.getByRole('link', { name: /^My Listings$/i });
    this.wishlistLink = this.root.getByRole('link', { name: /^Wishlist$/i });
    this.fundsLink = this.root.getByRole('link', { name: /^Funds$/i });
    this.referralLink = this.root.getByRole('link', { name: /^Referral Rewards$/i });
    this.supportLink = this.root.getByRole('link', { name: /^Support$/i });
    this.transactionsLink = this.root.getByRole('link', { name: /^Transactions$/i });
    this.profileLink = this.root.getByRole('link', { name: /^My Profile$/i });
  }

  // Check that the left menu is visible
  async expectVisible() {
    await expect(this.root).toBeVisible();
    await expect(this.homeLink).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.portfolioLink).toBeVisible();
    await expect(this.myListingsLink).toBeVisible();
    await expect(this.wishlistLink).toBeVisible();
    await expect(this.fundsLink).toBeVisible();
    await expect(this.referralLink).toBeVisible();
    await expect(this.supportLink).toBeVisible();
    await expect(this.transactionsLink).toBeVisible();
    await expect(this.profileLink).toBeVisible();
  }

  /**
   * Check menu names are in the same order as the screenshot.
   * Easy way to catch a UI change later.
   */
  async expectMenuOrder() {
    const labels = await this.root.getByRole('link').evaluateAll((links) =>
      links
        .map((a) => (a.textContent || '').replace(/\s+/g, ' ').trim())
        .filter((text) => text.length > 0),
    );

    // Keep only the known menu labels, in the order they appear
    const known = SidebarComponent.MENU_ORDER;
    const found = labels.filter((label) =>
      known.some((name) => new RegExp(`^${name}$`, 'i').test(label)),
    );

    expect(found.map((t) => t.toLowerCase())).toEqual(
      known.map((t) => t.toLowerCase()),
    );
  }

  // Click a menu item and wait for the new page URL
  async navigate(link, urlPattern) {
    await expect(link).toBeVisible();
    await link.click();
    await expect(this.page).toHaveURL(urlPattern, { timeout: 20_000 });
  }

  // 1. Home
  async goToHome() {
    await this.navigate(this.homeLink, /\/en(?:\/dashboard)?(?:\/)?(?:\?|$)/);
  }

  // 2. Dashboard
  async goToDashboard() {
    await this.navigate(this.dashboardLink, /\/en\/dashboard(?:\?|$|\/)/);
  }

  // 3. My Portfolio
  async goToPortfolio() {
    await this.navigate(this.portfolioLink, /\/en\/dashboard\/my-portfolio/);
  }

  // 4. My Listings
  async goToMyListings() {
    await this.navigate(this.myListingsLink, /\/en\/dashboard\/sell-shares/);
  }

  // 5. Wishlist
  async goToWishlist() {
    await this.navigate(this.wishlistLink, /\/en\/dashboard\/wishlist/);
  }

  // 6. Funds
  async goToFunds() {
    await this.navigate(this.fundsLink, /\/en\/dashboard\/my-points/);
  }

  // 7. Referral Rewards
  async goToReferralRewards() {
    await this.navigate(this.referralLink, /\/en\/dashboard\/referral-rewards/);
  }

  // 8. Support
  async goToSupport() {
    await this.navigate(this.supportLink, /\/en\/dashboard\/support/);
  }

  // 9. Transactions
  async goToTransactions() {
    await this.navigate(this.transactionsLink, /\/en\/dashboard\/transactions/);
  }

  // 10. My Profile
  async goToProfile() {
    await this.navigate(this.profileLink, /\/en\/dashboard\/my-profile/);
  }
}

module.exports = { SidebarComponent };
