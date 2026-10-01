const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { NavbarComponent } = require('../../components/shared/NavbarComponent');
const { MobileMenuComponent } = require('../../components/shared/MobileMenuComponent');
const { FooterComponent } = require('../../components/shared/FooterComponent');
const { CookieConsentComponent } = require('../../components/shared/CookieConsentComponent');
const { FormComponent } = require('../../components/shared/FormComponent');
const { routes } = require('../../test-data/pages');

/**
 * Home page.
 * URL: /en
 * This page uses the top navbar, mobile menu, and footer.
 */
class HomePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.path = routes.home;

    // Reuse shared parts of the site (do not copy selectors here)
    this.navbar = new NavbarComponent(page);
    this.mobileMenu = new MobileMenuComponent(page);
    this.footer = new FooterComponent(page);
    this.cookies = new CookieConsentComponent(page);
    this.newsletterForm = new FormComponent(page, this.footer.root);

    // Big hero text on the home page
    this.heroHeading = page.getByRole('heading', {
      name: /Own Real Estate\.\s*Digitally\.\s*Transparently\./i,
    });
    this.heroSubtext = page.getByText(/from as little as\s*1,000\s*BDT/i).first();

    // Main buttons. We use href so we click the real link, not a carousel copy.
    this.exploreProjectsCta = page.locator('a[href*="/projects"]').filter({ hasText: /^Explore Projects$/i }).first();
    this.signUpCta = page.locator('a[href*="sign-up"]').filter({ hasText: /^Sign Up$/i }).first();
    this.referralCta = page.getByRole('link', { name: /^Referral$/i }).first();

    this.seeMoreProjects = page.getByRole('link', { name: /See More Projects/i });
    this.whyChooseHeading = page.getByRole('heading', { name: /Why choose Aungsha\?/i });
    this.howItWorksHeading = page.getByRole('heading', { name: /How Aungsha Works/i });
    this.readyProjectsHeading = page.getByRole('heading', { name: /Ready project to buy shares/i });
    this.supportMenuButton = page.getByRole('button', { name: /Open support menu/i });
  }

  // Open home and close cookie banner if it still shows
  async open() {
    await this.goto(this.path);
    await this.page.waitForLoadState('domcontentloaded');
    await this.cookies.acceptIfPresent();
  }

  // Click a link and check the new URL
  // Wait until the URL matches, even if staging briefly reloads
  async clickAndWaitForUrl(link, urlPattern) {
    await expect(link).toBeVisible();
    await link.click();
    await expect.poll(async () => this.page.url(), { timeout: 20_000 }).toMatch(urlPattern);
  }

  async expectLoaded() {
    await this.expectUrl(/\/en(?:\/)?(?:\?|$)/);
    await this.expectTitle(/Aungsha/i);
    await expect(this.heroHeading).toBeVisible();
  }

  async expectImportantElementsVisible() {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.heroSubtext).toBeVisible();
    await expect(this.exploreProjectsCta).toBeVisible();
  }

  async clickExploreProjects() {
    await this.clickAndWaitForUrl(this.exploreProjectsCta, /\/en\/projects/);
  }

  async clickSignUp() {
    await this.clickAndWaitForUrl(this.signUpCta, /\/en\/sign-up/);
  }

  async getPrimaryCtas() {
    return {
      explore: this.exploreProjectsCta,
      signUp: this.signUpCta,
      seeMore: this.seeMoreProjects,
    };
  }
}

module.exports = { HomePage };
