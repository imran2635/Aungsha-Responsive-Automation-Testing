const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * Forgot password — Screenshots 090430 / 090438
 * URL: /en/forgot-password
 */
class ForgotPasswordPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.forgotPassword;
    this.cookies = new CookieConsentComponent(page);

    this.heading = page.getByRole('heading', { name: /Forgot your password\?/i });
    this.phoneTab = page.getByRole('tab', { name: /^Phone$/i })
      .or(page.getByRole('button', { name: /^Phone$/i }));
    this.emailTab = page.getByRole('tab', { name: /^Email$/i })
      .or(page.getByRole('button', { name: /^Email$/i }));
    this.phoneInput = page.getByPlaceholder(/phone/i).or(page.getByLabel(/Phone number/i));
    this.emailInput = page.getByPlaceholder(/registered email/i);
    this.sendCodeButton = page.getByRole('button', { name: /Send reset code/i });
    this.backToSignIn = page.getByRole('link', { name: /Back to sign in/i });
  }

  async open() {
    await this.goto(this.path);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/forgot-password/);
    await expect(this.heading).toBeVisible();
    await expect(this.sendCodeButton).toBeVisible();
  }

  async selectEmailTab() {
    await this.emailTab.first().click();
    await expect(this.emailInput).toBeVisible();
  }
}

module.exports = { ForgotPasswordPage };
