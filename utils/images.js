/**
 * Image load / broken-image helpers.
 */

/**
 * Inspect all <img> elements for load failures.
 * @param {import('@playwright/test').Page} page
 * @param {{ scope?: import('@playwright/test').Locator }} [options]
 * @returns {Promise<Array<{ src: string, alt: string, naturalWidth: number, complete: boolean, broken: boolean }>>}
 */
async function collectImageStatuses(page, options = {}) {
  const root = options.scope || page.locator('body');
  return root.locator('img').evaluateAll((images) =>
    images.map((img) => {
      const src = img.currentSrc || img.getAttribute('src') || '';
      const naturalWidth = img.naturalWidth;
      const complete = img.complete;
      const broken = complete && naturalWidth === 0 && !!src && !src.startsWith('data:');
      return {
        src: src.slice(0, 200),
        alt: img.alt || '',
        naturalWidth,
        complete,
        broken,
      };
    }),
  );
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function findBrokenImages(page) {
  const all = await collectImageStatuses(page);
  return all.filter((img) => img.broken);
}

/**
 * Assert zero broken images on the page.
 * @param {import('@playwright/test').Page} page
 */
async function assertNoBrokenImages(page) {
  const { expect } = require('@playwright/test');
  const broken = await findBrokenImages(page);
  expect(broken, `Broken images found: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
}

module.exports = {
  collectImageStatuses,
  findBrokenImages,
  assertNoBrokenImages,
};
