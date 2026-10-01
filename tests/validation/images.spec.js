const { test, expect } = require('../../fixtures/test.fixture');
const { collectImageStatuses, findBrokenImages } = require('../../utils/images');

test.describe('Validation — images', () => {
  test('homepage images load without broken assets', async ({ page, homePage }) => {
    await homePage.open();
    await homePage.heroHeading.waitFor({ state: 'visible' });
    await homePage.readyProjectsHeading.scrollIntoViewIfNeeded().catch(() => {});
    const broken = await findBrokenImages(page);
    expect(broken, `Broken images: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
  });

  test('logo image has meaningful alt text', async ({ page, homePage }) => {
    await homePage.open();
    const images = await collectImageStatuses(page);
    const logo = images.find((img) => /logo/i.test(img.alt) || /logo/i.test(img.src));
    expect(logo, 'Expected an Aungsha logo image').toBeTruthy();
    expect(logo.alt.length).toBeGreaterThan(0);
    expect(logo.broken).toBe(false);
  });

  test('sign-in page has no broken images', async ({ page, loginPage }) => {
    await loginPage.open();
    const broken = await findBrokenImages(page);
    expect(broken, `Broken images: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
  });
});
