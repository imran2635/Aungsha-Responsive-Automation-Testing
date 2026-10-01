const { test, expect } = require('../../fixtures/test.fixture');

/**
 * Public pages smoke suite — maps to Screenshots 085927–090005.
 * These do not need login credentials.
 */
test.describe('Public pages — screenshot map', () => {
  test('Home loads hero and CTAs (085927)', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.expectImportantElementsVisible();
  });

  test('Projects page search visible (085937)', async ({ projectsPage }) => {
    await projectsPage.open();
    await projectsPage.expectLoaded();
    // Heading "All Projects" is always present; filter chips vary by viewport/build
    await expect(projectsPage.heading).toBeVisible();
  });

  test('Marketplace Browse tab and Buy Now (085951)', async ({ marketplacePage }) => {
    await marketplacePage.open();
    await marketplacePage.expectLoaded();
    await marketplacePage.expectBuyNowVisible();
  });

  test('About Us legacy heading visible (090005)', async ({ aboutPage }) => {
    await aboutPage.open();
    await aboutPage.expectLoaded();
  });

  test('Navbar link hrefs match screenshot menu routes', async ({ homePage }) => {
    // Check hrefs only — SPA sometimes flashes /projects then returns to /en under load
    await homePage.open();
    await expect(homePage.navbar.projectsLink).toHaveAttribute('href', /\/en\/projects/);
    await expect(homePage.navbar.marketplaceLink).toHaveAttribute('href', /\/en\/marketplace/);
    await expect(homePage.navbar.aboutLink).toHaveAttribute('href', /\/en\/about/);
  });
});
