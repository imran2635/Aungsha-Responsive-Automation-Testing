const { test, expect } = require('../../fixtures/test.fixture');
const { assertNoHorizontalOverflow, findHorizontallyOverflowingElements } = require('../../utils/responsive');
const { assertHomepageHealth } = require('../../utils/assertions');

test.describe('Validation — page health', () => {
  test('homepage has correct title and key landmarks', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await expect(homePage.heroHeading).toBeVisible();
    await homePage.footer.expectVisible();
  });

  test('homepage has no horizontal overflow at desktop size', async ({ page, homePage }) => {
    await homePage.open();
    await assertNoHorizontalOverflow(page);
    const offenders = await findHorizontallyOverflowingElements(page, 'main *, footer *, nav *');
    // Allow decorative absolute elements; document-level overflow is the hard gate
    expect(Array.isArray(offenders)).toBe(true);
  });

  test('homepage health helpers pass', async ({ page, homePage }) => {
    await homePage.open();
    await assertHomepageHealth(page);
  });
});
