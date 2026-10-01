const { test, expect } = require('../../fixtures/test.fixture');
const { publicPages } = require('../../test-data/pages');

test.describe('Mobile menu — bottom navigation @ 390px', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('bottom Menu nav is visible on mobile viewport', async ({ homePage }) => {
    await homePage.mobileMenu.expectVisible();
  });

  test('mobile Projects link navigates', async ({ page, homePage }) => {
    await homePage.mobileMenu.clickProjects();
    await expect(page).toHaveURL(publicPages.projects.url);
  });

  test('mobile Marketplace link navigates', async ({ page, homePage }) => {
    await homePage.mobileMenu.clickMarketplace();
    await expect(page).toHaveURL(publicPages.marketplace.url);
  });

  test('mobile Login link navigates to sign-in', async ({ page, homePage }) => {
    await homePage.mobileMenu.clickLogin();
    await expect(page).toHaveURL(publicPages.signIn.url);
  });
});

test.describe('Desktop — mobile Menu hidden', () => {
  test.use({ viewport: { width: 1366, height: 768 }, isMobile: false, hasTouch: false });

  test('mobile Menu is hidden while top nav is shown', async ({ homePage }) => {
    await homePage.open();
    await homePage.navbar.expectDesktopNavVisible();
    await homePage.mobileMenu.expectHidden();
  });
});
