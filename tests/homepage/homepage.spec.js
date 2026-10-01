const { test, expect } = require('../../fixtures/test.fixture');
const { publicPages } = require('../../test-data/pages');
const { assertPageBasics } = require('../../utils/assertions');

test.describe('Homepage — core content', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('loads with correct title and URL', async ({ page, homePage }) => {
    await homePage.expectLoaded();
    await assertPageBasics(page, {
      titlePattern: publicPages.home.title,
      urlPattern: publicPages.home.url,
    });
  });

  test('shows important hero text and CTAs', async ({ homePage }) => {
    await homePage.expectImportantElementsVisible();
    await expect(homePage.heroHeading).toContainText(/Own Real Estate/i);
    await expect(homePage.heroSubtext).toBeVisible();
  });

  test('shows key section headings', async ({ homePage }) => {
    await homePage.whyChooseHeading.scrollIntoViewIfNeeded();
    await expect(homePage.whyChooseHeading).toBeVisible();
    await homePage.howItWorksHeading.scrollIntoViewIfNeeded();
    await expect(homePage.howItWorksHeading).toBeVisible();
  });

  test('Explore Projects CTA navigates to projects', async ({ page, homePage }) => {
    await homePage.clickExploreProjects();
    await expect(page).toHaveURL(/\/en\/projects/);
  });

  test('Sign Up CTA navigates to sign-up', async ({ page, homePage }) => {
    await homePage.clickSignUp();
    await expect(page).toHaveURL(/\/en\/sign-up/);
  });
});
