/**
 * Public top navigation — Screenshot 085927 (Home / Projects / Marketplace / About Us / Login).
 * Desktop only primary chrome; mobile uses MobileMenuComponent instead.
 */
class NavbarComponent {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Filter to the top nav that contains "About Us" (mobile Menu does not)
    this.root = page.locator('nav').filter({ has: page.getByRole('link', { name: /^About Us$/i }) }).first();
    this.homeLink = this.root.getByRole('link', { name: /^Home$/i });
    this.projectsLink = this.root.getByRole('link', { name: /^Projects$/i });
    this.marketplaceLink = this.root.getByRole('link', { name: /^Marketplace$/i });
    this.aboutLink = this.root.getByRole('link', { name: /^About Us$/i });
    this.loginLink = this.root.getByRole('link', { name: /^Login$/i });

    // Language toggle lives in the header on every public page
    this.englishLink = page.getByRole('link', { name: /Switch to English/i });
    this.banglaLink = page.getByRole('link', { name: /Switch to Bangla/i });
  }

  async isVisible() {
    return this.aboutLink.isVisible().catch(() => false);
  }

  async expectDesktopNavVisible() {
    const { expect } = require('@playwright/test');
    await expect(this.homeLink).toBeVisible();
    await expect(this.projectsLink).toBeVisible();
    await expect(this.marketplaceLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
  }

  // Click a menu link, then wait until the URL matches
  async navigate(link, urlPattern) {
    const { expect } = require('@playwright/test');
    await expect(link).toBeVisible();
    await link.click();
    await expect.poll(async () => this.page.url(), { timeout: 20_000 }).toMatch(urlPattern);
  }

  async clickHome() { await this.navigate(this.homeLink, /\/en(?:\/)?(?:\?|$)/); }
  async clickProjects() { await this.navigate(this.projectsLink, /\/en\/projects/); }
  async clickMarketplace() { await this.navigate(this.marketplaceLink, /\/en\/marketplace/); }
  async clickAbout() { await this.navigate(this.aboutLink, /\/en\/about/); }
  async clickLogin() { await this.navigate(this.loginLink, /\/en\/sign-in/); }

  async switchToBangla() { await this.banglaLink.click(); }
  async switchToEnglish() { await this.englishLink.click(); }
}

module.exports = { NavbarComponent };
