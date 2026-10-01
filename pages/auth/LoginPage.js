const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { FormComponent } = require('../../components/shared/FormComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * Sign-in — Screenshots 090418
 * URL: /en/sign-in
 * Tabs: Phone | Email; Continue; Google; Create account; Forgot password.
 */
class LoginPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.signIn;
    this.cookies = new CookieConsentComponent(page);
    this.form = new FormComponent(page);

    this.logo = page.getByRole('link', { name: /Aungsha Logo/i });
    this.phoneTab = page.getByRole('tab', { name: /^Phone$/i });
    this.emailTab = page.getByRole('tab', { name: /^Email$/i });

    // Prefer placeholder / id discovered on staging DOM
    this.emailInput = page.getByPlaceholder(/enter your email address/i);
    this.phoneInput = page.locator('#signin-phone-number')
      .or(page.getByPlaceholder(/enter your phone number/i));
    this.passwordInput = page.locator('#signin-password')
      .or(page.getByPlaceholder(/enter your password/i));

    this.showPasswordButton = page.getByRole('button', { name: /Show password/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /Forgot password\?/i });
    this.continueButton = page.getByRole('button', { name: /^Continue$/i });
    this.googleLink = page.getByRole('link', { name: /^Google$/i });
    this.createAccountLink = page.getByRole('link', { name: /Create account/i });
  }

  async open() {
    await this.goto(this.path);
    await this.expectUrl(/\/en\/sign-in(?:\?|$)/);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await expect(this.continueButton).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  /** Switch to Email tab only when the email field is not already shown */
  async selectEmailTab() {
    if (await this.emailInput.isVisible().catch(() => false)) return;
    await this.emailTab.click();
    await expect(this.emailInput).toBeVisible();
  }

  async selectPhoneTab() {
    if (await this.phoneInput.isVisible().catch(() => false)) return;
    await this.phoneTab.click();
    await expect(this.phoneInput).toBeVisible();
  }

  async fillEmailCredentials(email, password) {
    await this.selectEmailTab();
    await this.form.fillField(this.emailInput, email);
    await this.form.fillField(this.passwordInput, password);
  }

  async submit() {
    await this.form.submit(this.continueButton);
  }

  /** Full happy-path login used by authenticated suite setup */
  async loginWithEmail(email, password) {
    await this.open();
    await this.fillEmailCredentials(email, password);
    await this.submit();
    await expect(this.page).not.toHaveURL(/\/en\/sign-in(?:\?|$)/, { timeout: 20_000 });
  }

  /** Empty submit should keep user on sign-in (HTML5 / app validation) */
  async expectEmptySubmitKeepsOnPage() {
    await this.selectEmailTab();
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.continueButton.click();
    await this.expectUrl(/\/en\/sign-in(?:\?|$)/);
    await expect(this.emailInput).toBeVisible();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
  }
}

module.exports = { LoginPage };
