const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { NavbarComponent } = require('../../components/shared/NavbarComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * About Us — Screenshot 090005
 * URL: /en/about
 */
class AboutPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.about;
    this.navbar = new NavbarComponent(page);
    this.cookies = new CookieConsentComponent(page);

    // Hero heading from screenshot
    this.heading = page.getByRole('heading', { name: /Built on a legacy of\s*Biswas Builders/i });
    this.subheading = page.getByText(/trusted construction names for over 30\+/i);
    this.completedBadges = page.getByText(/^Completed$/i);
  }

  async open() {
    await this.goto(this.path);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/about/);
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { AboutPage };
