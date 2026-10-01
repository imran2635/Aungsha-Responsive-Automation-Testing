const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * My Profile — Screenshot 090247
 * URL: /en/dashboard/my-profile
 */
class ProfilePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.profile;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /My Profile/i });
    this.subtitle = page.getByText(/Manage your personal information/i);
    this.contactInfo = page.getByRole('heading', { name: /Contact Info/i });
    this.accountSettings = page.getByRole('heading', { name: /Account Settings/i });
    this.emailRow = page.getByText(/Email Address/i);
    this.phoneRow = page.getByText(/Phone Number/i);
    this.changePassword = page.getByText(/Change your account password/i);
    this.profileVerification = page.getByText(/Profile Verification/i);
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/my-profile/);
    await expect(this.heading).toBeVisible();
    await expect(this.contactInfo).toBeVisible();
  }
}

module.exports = { ProfilePage };
