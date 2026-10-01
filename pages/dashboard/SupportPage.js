const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Support page (Customer Support hub).
 * URL: /en/dashboard/support
 * You need to be logged in to open this page.
 */
class SupportPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.support;

    // Left menu is shared on all dashboard pages
    this.sidebar = new SidebarComponent(page);

    // Main title on the green banner
    this.heading = page.getByRole('heading', { name: /Customer Support/i });

    // Helpful text from the page
    this.supportHours = page.getByText(/Support hours/i);
    this.callSupport = page.getByText(/Call Support/i);

    // Buttons that open a ticket or chat
    this.openSupportButtons = page.getByRole('button', { name: /Open Support/i })
      .or(page.getByRole('link', { name: /Open Support/i }));
    this.emailUsButton = page.getByRole('button', { name: /Email Us/i })
      .or(page.getByRole('link', { name: /Email Us/i }));

    // FAQ search box and first FAQ question
    this.faqSearch = page.getByPlaceholder(/Search FAQs/i);
    this.faqFirst = page.getByText(/How do I invest in a project\?/i);
  }

  // Open the Support page
  async open() {
    await this.goto(this.path);
  }

  // Check that the Support page loaded correctly
  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/support/);
    await expect(this.heading.or(this.openSupportButtons.first())).toBeVisible();
  }
}

module.exports = { SupportPage };
