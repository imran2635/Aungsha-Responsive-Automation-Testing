const { test, expect } = require('../../fixtures/test.fixture');
const { assertNoHorizontalOverflow, getDocumentOverflow } = require('../../utils/responsive');
const { MOBILE_NAV_MAX_WIDTH } = require('../../config/viewports');

test.describe('Responsive layouts', () => {
  test.describe.configure({ timeout: 60_000 });

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('page title remains Aungsha across viewports', async ({ homePage }) => {
    await homePage.expectTitle(/Aungsha/i);
  });

  test('hero and primary CTAs remain visible', async ({ page, homePage }) => {
    // Carousel may rotate — assert any visible Explore / Sign Up CTA
    const explore = page.getByRole('link', { name: /^Explore Projects$/i }).first();
    const signUp = page.getByRole('link', { name: /^Sign Up$/i }).first();
    await expect(explore).toBeVisible();
    await expect(signUp).toBeVisible();
    await expect(homePage.heroHeading.or(page.getByRole('heading').first())).toBeVisible();
  });

  test('no unexpected horizontal document overflow', async ({ page }) => {
    await assertNoHorizontalOverflow(page, 2);
    const overflow = await getDocumentOverflow(page);
    expect(overflow.hasHorizontalOverflow).toBe(false);
  });

  test('navbar behavior matches breakpoint', async ({ page, homePage }) => {
    const width = page.viewportSize()?.width ?? 0;
    const mobileLike = width <= MOBILE_NAV_MAX_WIDTH;

    if (mobileLike) {
      await homePage.mobileMenu.expectVisible();
    } else {
      await homePage.navbar.expectDesktopNavVisible();
      await homePage.mobileMenu.expectHidden();
    }
  });

  test('footer remains reachable and visible after scroll', async ({ homePage }) => {
    await homePage.footer.expectVisible();
  });

  test('important hero text is not cut off', async ({ page }) => {
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible();
    const box = await heading.boundingBox();
    expect(box, 'Heading should have a layout box').toBeTruthy();
    expect(box.width).toBeGreaterThan(40);
    expect(box.height).toBeGreaterThan(10);
  });
});
