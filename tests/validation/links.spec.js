const { test, expect } = require('../../fixtures/test.fixture');
const { collectLinks, findBrokenLinks } = require('../../utils/links');
const { publicPages } = require('../../test-data/pages');

test.describe('Validation — links', () => {
  test('internal navbar links resolve to expected routes', async ({ page, homePage }) => {
    await homePage.open();
    await homePage.navbar.clickProjects();
    await expect(page).toHaveURL(publicPages.projects.url);

    await homePage.open();
    await homePage.navbar.clickMarketplace();
    await expect(page).toHaveURL(publicPages.marketplace.url);
  });

  test('footer internal links have valid hrefs', async ({ homePage }) => {
    await homePage.open();
    await homePage.footer.scrollIntoView();

    const expected = [
      { locator: homePage.footer.about, href: /\/en\/about/ },
      { locator: homePage.footer.faqs, href: /\/en\/faqs/ },
      { locator: homePage.footer.privacyPolicy, href: /\/en\/privacy-policy/ },
      { locator: homePage.footer.terms, href: /\/en\/terms-and-conditions/ },
    ];

    for (const item of expected) {
      await expect(item.locator).toBeVisible();
      await expect(item.locator).toHaveAttribute('href', item.href);
    }
  });

  test('external social links open absolute https URLs', async ({ homePage }) => {
    await homePage.open();
    await homePage.footer.scrollIntoView();

    for (const link of [homePage.footer.linkedin, homePage.footer.facebook, homePage.footer.instagram, homePage.footer.x]) {
      await expect(link).toHaveAttribute('href', /^https:\/\//);
    }
  });

  test('homepage internal links return non-error HTTP status', async ({ page, request, homePage }) => {
    await homePage.open();
    const links = await collectLinks(page);
    const internal = links.filter((l) => l.type === 'internal');
    expect(internal.length).toBeGreaterThan(0);

    const broken = await findBrokenLinks(request, internal, { includeExternal: false });
    expect(broken, `Broken internal links: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
  });
});
