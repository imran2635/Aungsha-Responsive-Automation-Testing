const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { NavbarComponent } = require('../../components/shared/NavbarComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { routes } = require('../../test-data/pages');

/**
 * Projects listing — Screenshot 085937
 * URL: /en/projects
 * Search + category filters + project cards grid.
 */
class ProjectsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.projects;
    this.navbar = new NavbarComponent(page);
    this.cookies = new CookieConsentComponent(page);

    // Placeholder from screenshot: "Search project by locations..."
    this.searchInput = page.getByPlaceholder(/Search project by locations/i);
    this.heading = page.getByRole('heading', { name: /All Projects/i });

    // Filter chips may be button, tab, or link depending on build — keep flexible
    this.filterAll = page.getByRole('button', { name: /All Projects/i })
      .or(page.getByRole('tab', { name: /All Projects/i }))
      .or(page.getByText(/^All Projects$/i));
    this.filterHotel = page.getByRole('button', { name: /^Hotel$/i })
      .or(page.getByText(/^Hotel$/i));
    this.filterLand = page.getByRole('button', { name: /^Land$/i })
      .or(page.getByText(/^Land$/i));
    this.filterPlot = page.getByRole('button', { name: /^Plot$/i })
      .or(page.getByText(/^Plot$/i));
    this.filterApartment = page.getByRole('button', { name: /^Apartment$/i })
      .or(page.getByText(/^Apartment$/i));
    this.filterBudget = page.getByRole('button', { name: /^Budget$/i })
      .or(page.getByText(/^Budget$/i));

    // Cards are links/articles that contain a project title
    this.projectCards = page.locator('a, article').filter({
      has: page.getByRole('heading').or(page.getByText(/Cloud 9|PURBACHAL|Beach Point/i)),
    });
  }

  async open() {
    await this.goto(this.path);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/projects/);
    await expect(this.searchInput).toBeVisible();
    await expect(this.heading).toBeVisible();
  }

  /** Type into search — used by responsive + functional coverage */
  async search(term) {
    await this.searchInput.fill(term);
  }

  async selectFilter(filterButton) {
    await expect(filterButton).toBeVisible();
    await filterButton.click();
  }

  /** Open first visible project card for details-page smoke tests */
  async openFirstProject() {
    const first = this.page.getByRole('link', { name: /Cloud 9|PURBACHAL|Beach Point/i }).first();
    await first.click();
    await expect(this.page).toHaveURL(/\/en\/projects\/.+/);
  }
}

module.exports = { ProjectsPage };
