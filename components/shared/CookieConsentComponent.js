const { expect } = require('@playwright/test');

/**
 * Cookie consent banner.
 * Why a dedicated component: every public page can show
 * section[aria-label="Cookie consent banner"] and it blocks bottom nav clicks.
 * Prefer setting aungsha_cookie_consent=accepted in fixtures; this is the fallback.
 */
class CookieConsentComponent {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    // Exact aria-label from staging DOM (more reliable than generic "cookie" text)
    this.banner = page
      .locator('section[aria-label="Cookie consent banner"]')
      .or(page.getByRole('region', { name: /cookie/i }))
      .first();
    this.acceptButton = this.banner
      .getByRole('button', { name: /^Accept$/i })
      .or(page.getByRole('button', { name: /^Accept$/i }))
      .first();
  }

  async isVisible() {
    return this.banner.isVisible({ timeout: 2_000 }).catch(() => false);
  }

  /** Click Accept when present; return true if a click happened */
  async acceptIfPresent() {
    if (!(await this.isVisible())) return false;

    await this.acceptButton.click({ timeout: 5_000 }).catch(async () => {
      // Force DOM click if Playwright actionability is blocked by overlays
      await this.page.evaluate(() => {
        const section = document.querySelector('section[aria-label="Cookie consent banner"]');
        const scope = section || document;
        const btn = [...scope.querySelectorAll('button')].find((el) =>
          /^accept$/i.test((el.textContent || '').trim()),
        );
        btn?.click();
      });
    });

    await expect(this.banner).toBeHidden({ timeout: 10_000 });
    return true;
  }
}

module.exports = { CookieConsentComponent };
