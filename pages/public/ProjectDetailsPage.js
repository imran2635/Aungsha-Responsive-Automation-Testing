const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { NavbarComponent } = require('../../components/shared/NavbarComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');

/**
 * Public project details — Screenshots 090035 / 090036 / 090054
 * URL: /en/projects/:id
 * Unit stepper + projected gains + Price Growth Overview chart.
 */
class ProjectDetailsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.navbar = new NavbarComponent(page);
    this.cookies = new CookieConsentComponent(page);

    this.assetTrackerHeading = page.getByText(/Track expected assets value movement over time/i);
    this.currentValue = page.getByText(/Current Value/i);
    this.priceGrowthHeading = page.getByRole('heading', { name: /Price Growth Overview/i });
    this.projectedGain = page.getByText(/Projected gain/i);
    // +/- unit controls shown next to the unit count input
    this.incrementUnit = page.getByRole('button', { name: /^\+$/ }).first();
    this.decrementUnit = page.getByRole('button', { name: /^-$/ }).first();
  }

  /**
   * Open a known project id from screenshots (Cloud 9 / Purbachal detail).
   * @param {string} projectId
   */
  async open(projectId) {
    await this.goto(`/en/projects/${projectId}`);
    await this.cookies.acceptIfPresent();
  }

  async expectLoaded() {
    await this.expectUrl(/\/en\/projects\/.+/);
    await expect(this.assetTrackerHeading.or(this.priceGrowthHeading).first()).toBeVisible();
  }
}

module.exports = { ProjectDetailsPage };
