const { test, expect } = require('../../fixtures/test.fixture');
const { publicPages } = require('../../test-data/pages');

test.describe('Navbar — desktop navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('desktop navbar links are visible', async ({ homePage }) => {
    await homePage.navbar.expectDesktopNavVisible();
  });

  test('Projects link navigates correctly', async ({ page, homePage }) => {
    await homePage.navbar.clickProjects();
    await expect(page).toHaveURL(publicPages.projects.url);
  });

  test('Marketplace link navigates correctly', async ({ page, homePage }) => {
    await homePage.navbar.clickMarketplace();
    await expect(page).toHaveURL(publicPages.marketplace.url);
  });

  test('About Us link navigates correctly', async ({ page, homePage }) => {
    await homePage.navbar.clickAbout();
    await expect(page).toHaveURL(publicPages.about.url);
  });

  test('Login link navigates to sign-in', async ({ page, homePage }) => {
    await homePage.navbar.clickLogin();
    await expect(page).toHaveURL(publicPages.signIn.url);
  });

  test('language switcher exposes English and Bangla', async ({ homePage }) => {
    await expect(homePage.navbar.englishLink).toBeVisible();
    await expect(homePage.navbar.banglaLink).toBeVisible();
  });
});
