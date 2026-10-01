const { expect } = require('@playwright/test');

/**
 * Payment method popup on the Funds page.
 * Shows after you click Withdraw.
 * Example: choose bKash, or add a new method, then Continue.
 */
class SelectPaymentMethodModal {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // The whole popup window
    this.root = page.getByRole('dialog').filter({ hasText: /Select Payment Method/i })
      .or(page.locator('[role="dialog"], [data-state="open"]').filter({ hasText: /Select Payment Method/i }))
      .first();

    // Popup title
    this.title = page.getByRole('heading', { name: /Select Payment Method/i })
      .or(page.getByText(/^Select Payment Method$/i));

    // Button to save a new bKash / wallet
    this.addNewMethodButton = page.getByRole('button', { name: /Add New Method/i })
      .or(page.getByRole('link', { name: /Add New Method/i }));

    // X button to close the popup
    this.closeButton = this.root.getByRole('button', { name: /close/i })
      .or(page.locator('[aria-label="Close"]').first());

    // Saved bKash rows
    this.bkashOptions = page.getByText(/^bKash$/i);

    // Delete icons on each saved method
    this.deleteButtons = page.getByRole('button', { name: /delete|remove|trash/i });

    // Round select buttons on each method
    this.radioButtons = page.getByRole('radio');

    // Green Continue button at the bottom
    this.continueButton = page.getByRole('button', { name: /^Continue$/i });
  }

  // Check that the popup is open
  async expectVisible() {
    await expect(this.title.first()).toBeVisible({ timeout: 15_000 });
    await expect(this.continueButton.first()).toBeVisible();
  }

  async expectHidden() {
    await expect(this.title.first()).toBeHidden({ timeout: 10_000 });
  }

  async clickAddNewMethod() {
    await this.addNewMethodButton.first().click();
  }

  // Choose the first saved bKash method
  async selectFirstBkashMethod() {
    const firstRadio = this.radioButtons.first();
    if (await firstRadio.isVisible().catch(() => false)) {
      await firstRadio.check({ force: true }).catch(async () => {
        await firstRadio.click({ force: true });
      });
      return;
    }
    await this.bkashOptions.first().click();
  }

  async continue() {
    await expect(this.continueButton.first()).toBeEnabled({ timeout: 10_000 }).catch(() => {});
    await this.continueButton.first().click();
  }

  // Close the popup without withdrawing money
  async close() {
    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
      return;
    }
    await this.page.keyboard.press('Escape');
  }
}

module.exports = { SelectPaymentMethodModal };
