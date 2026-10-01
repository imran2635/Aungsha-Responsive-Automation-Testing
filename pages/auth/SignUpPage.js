const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { FormComponent } = require('../../components/shared/FormComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * Sign-up — Screenshots 090344 / 090353
 * URL: /en/sign-up
 * Phone/Email tabs, referral/campaign codes, Terms checkbox, Continue.
 */
class SignUpPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.signUp;
    this.cookies = new CookieConsentComponent(page);
    this.form = new FormComponent(page);

    this.phoneTab = page.getByRole('tab', { name: /^Phone$/i });
    this.emailTab = page.getByRole('tab', { name: /^Email$/i });
    this.fullNameInput = page.getByPlaceholder(/Enter your full name/i);
    this.phoneInput = page.getByPlaceholder(/phone number/i).or(page.getByLabel(/Phone number/i));
    this.emailInput = page.getByPlaceholder(/email/i);
    this.passwordInput = page.getByPlaceholder(/Create a strong password/i);
    this.referralSection = page.getByText(/Apply Referral or Campaign Code/i);
    this.referralCodeInput = page.getByPlaceholder(/Enter referral code/i);
    this.campaignCodeInput = page.getByPlaceholder(/Enter campaign code/i);
    this.termsCheckbox = page.getByRole('checkbox');
    this.continueButton = page.getByRole('button', { name: /^Continue$/i });
  }

  async open() {
    await this.goto(this.path);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/sign-up/);
    await expect(this.continueButton).toBeVisible();
    await expect(this.fullNameInput).toBeVisible();
  }

  /** Expand referral/campaign accordion so both code fields are fillable */
  async openReferralSection() {
    if (await this.referralCodeInput.isVisible().catch(() => false)) return;
    await this.referralSection.click();
    await expect(this.referralCodeInput.or(this.campaignCodeInput).first()).toBeVisible();
  }
}

module.exports = { SignUpPage };
