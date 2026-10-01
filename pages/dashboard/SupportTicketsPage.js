const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { SidebarComponent } = require('../../components/shared/SidebarComponent');
const { routes } = require('../../test-data/pages');

/**
 * Support tickets list — Screenshot 090219
 * URL: /en/dashboard/support/tickets
 */
class SupportTicketsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.supportTickets;
    this.sidebar = new SidebarComponent(page);

    this.heading = page.getByRole('heading', { name: /^Support$/i });
    this.totalTickets = page.getByText(/Total Tickets/i);
    this.pending = page.getByText(/^Pending$/i);
    this.resolved = page.getByText(/^Resolved$/i);
    this.newTicketButton = page.getByRole('button', { name: /New Ticket/i })
      .or(page.getByRole('link', { name: /New Ticket/i }));
    this.ticketLinks = page.getByRole('link', { name: /Ticket #/i });
  }

  async open() {
    await this.goto(this.path);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/dashboard\/support\/tickets/);
    await expect(this.newTicketButton.or(this.totalTickets).first()).toBeVisible();
  }
}

module.exports = { SupportTicketsPage };
