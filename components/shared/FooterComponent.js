/**
 * Site footer — company / learn / legal links, social, newsletter.
 */
class FooterComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.root = page.locator('footer');
    this.supportEmail = this.root.getByRole('link', { name: /support@aungsha\.com/i });
    this.linkedin = this.root.getByRole('link', { name: /^linkedin$/i });
    this.facebook = this.root.getByRole('link', { name: /^facebook$/i });
    this.instagram = this.root.getByRole('link', { name: /^instagram$/i });
    this.x = this.root.getByRole('link', { name: /^x$/i });
    this.about = this.root.getByRole('link', { name: /^About$/i });
    this.csr = this.root.getByRole('link', { name: /^CSR$/i });
    this.support = this.root.getByRole('link', { name: /^Support$/i });
    this.blog = this.root.getByRole('link', { name: /^Blog$/i });
    this.faqs = this.root.getByRole('link', { name: /^FAQs$/i });
    this.glossary = this.root.getByRole('link', { name: /^Glossary$/i });
    this.privacyPolicy = this.root.getByRole('link', { name: /^Privacy Policy$/i }).first();
    this.terms = this.root.getByRole('link', { name: /^Terms & Conditions$/i });
    this.refundPolicy = this.root.getByRole('link', { name: /^Refund Policy$/i }).first();
    this.cookiePolicy = this.root.getByRole('link', { name: /^Cookie Policy$/i }).first();
    this.newsletterInput = this.root.getByPlaceholder(/your email/i);
    this.subscribeButton = this.root.getByRole('button', { name: /Subscribe to newsletter/i });
    this.copyright = this.root.getByText(/©\s*\d{4}\s*Aungsha/i);
  }

  async scrollIntoView() {
    await this.root.scrollIntoViewIfNeeded();
  }

  async expectVisible() {
    const { expect } = require('@playwright/test');
    await this.scrollIntoView();
    await expect(this.root).toBeVisible();
    await expect(this.copyright).toBeVisible();
  }

  async getInternalLinks() {
    return this.root.locator('a[href^="/"], a[href*="staging.aungsha.com"]').all();
  }

  async getExternalLinks() {
    return this.root.locator('a[href^="http"]').all();
  }
}

module.exports = { FooterComponent };
