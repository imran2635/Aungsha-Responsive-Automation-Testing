const { expect } = require('@playwright/test');

/**
 * Reusable form helpers — fill, submit, basic HTML5 validation checks.
 * Page-specific forms compose this rather than duplicating fill logic.
 */
class FormComponent {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').Locator} [root]
   */
  constructor(page, root) {
    this.page = page;
    this.root = root || page.locator('form').first();
  }

  /**
   * @param {import('@playwright/test').Locator} field
   * @param {string} value
   */
  async fillField(field, value) {
    await expect(field).toBeVisible();
    await field.fill(value);
    await expect(field).toHaveValue(value);
  }

  /**
   * @param {import('@playwright/test').Locator} field
   */
  async clearField(field) {
    await field.clear();
  }

  /**
   * @param {import('@playwright/test').Locator} submitButton
   */
  async submit(submitButton) {
    await expect(submitButton).toBeVisible();
    await submitButton.click();
  }

  /**
   * Uses browser constraint validation for required empty fields.
   * @param {import('@playwright/test').Locator} field
   */
  async expectRequiredInvalid(field) {
    const invalid = await field.evaluate((el) => {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) {
        return false;
      }
      el.checkValidity();
      return !el.validity.valid;
    });
    expect(invalid, 'Expected field to fail HTML5 validation').toBe(true);
  }

  /**
   * @param {import('@playwright/test').Locator} field
   * @param {string} type — e.g. 'email', 'password', 'tel'
   */
  async expectInputType(field, type) {
    await expect(field).toHaveAttribute('type', type);
  }
}

module.exports = { FormComponent };
