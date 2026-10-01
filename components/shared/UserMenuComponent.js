const { expect } = require('@playwright/test');

/**
 * Logged-in profile dropdown in the top header
 * (Screenshot shows: Dashboard, Profile, Log out).
 * Separated from Navbar so public + authenticated pages can reuse it.
 */
class UserMenuComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Profile chip shows avatar + name; clicking opens the dropdown menu
    this.trigger = page.getByRole('button', { name: /Imran|profile|account/i })
      .or(page.locator('button').filter({ hasText: /@|Bponi/i }).first())
      .or(page.getByText(/Imran Bponi/i).first());

    // Menu items from the open dropdown panel
    this.dashboardItem = page.getByRole('menuitem', { name: /^Dashboard$/i })
      .or(page.getByRole('link', { name: /^Dashboard$/i }).last());
    this.profileItem = page.getByRole('menuitem', { name: /^Profile$/i })
      .or(page.getByRole('link', { name: /^Profile$/i }).last());
    this.logoutItem = page.getByRole('menuitem', { name: /Log out/i })
      .or(page.getByRole('button', { name: /Log out/i }))
      .or(page.getByText(/^Log out$/i));
  }

  /** Open the dropdown so menu items become visible */
  async open() {
    await this.trigger.click();
    // Wait for at least one known menu action so we know the panel rendered
    await expect(this.logoutItem.or(this.dashboardItem).first()).toBeVisible({ timeout: 10_000 });
  }

  async goToDashboard() {
    await this.open();
    await this.dashboardItem.first().click();
    await expect(this.page).toHaveURL(/\/en\/dashboard/);
  }

  async goToProfile() {
    await this.open();
    await this.profileItem.first().click();
    await expect(this.page).toHaveURL(/\/en\/dashboard\/my-profile|\/en\/profile/);
  }

  async logout() {
    await this.open();
    await this.logoutItem.first().click();
  }
}

module.exports = { UserMenuComponent };
