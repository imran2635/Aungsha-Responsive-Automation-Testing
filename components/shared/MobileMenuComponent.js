/**
 * Mobile bottom navigation — nav[aria-label="Menu"]
 * Screenshot mobile chrome: Home | Projects | Marketplace | Login
 * Hidden on desktop (links not painted) — use isVisible() on a child link.
 */
class MobileMenuComponent {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.root = page.getByRole('navigation', { name: /^Menu$/i });
    this.homeLink = this.root.getByRole('link', { name: /^Home$/i });
    this.projectsLink = this.root.getByRole('link', { name: /^Projects$/i });
    this.marketplaceLink = this.root.getByRole('link', { name: /^Marketplace$/i });
    this.loginLink = this.root.getByRole('link', { name: /^Login$/i });
  }

  /** True when a Menu link is actually painted (desktop keeps DOM but hides it) */
  async isVisuallyPresent() {
    return this.homeLink.isVisible().catch(() => false);
  }

  async expectVisible() {
    const { expect } = require('@playwright/test');
    await expect(this.homeLink).toBeVisible();
    await expect(this.projectsLink).toBeVisible();
    await expect(this.marketplaceLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }

  async expectHidden() {
    const { expect } = require('@playwright/test');
    await expect(this.homeLink).toBeHidden();
  }

  /**
   * Assert href first (documents expected route), then click and wait for URL.
   * @param {import('@playwright/test').Locator} link
   * @param {RegExp} urlPattern
   */
  async navigate(link, urlPattern) {
    const { expect } = require('@playwright/test');
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href, 'Menu link should expose a navigable href').toMatch(urlPattern);
    await link.click();
    await expect(this.page).toHaveURL(urlPattern, { timeout: 20_000 });
  }

  async clickHome() {
    await this.navigate(this.homeLink, /\/en(?:\/dashboard)?(?:\/)?(?:\?|$)/);
  }

  async clickProjects() { await this.navigate(this.projectsLink, /\/en\/projects/); }
  async clickMarketplace() { await this.navigate(this.marketplaceLink, /\/en\/marketplace/); }
  async clickLogin() { await this.navigate(this.loginLink, /\/en\/sign-in/); }
}

module.exports = { MobileMenuComponent };
