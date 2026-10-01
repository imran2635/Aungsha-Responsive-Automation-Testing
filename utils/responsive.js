/**
 * Responsive layout validators — no fragile pixel-perfect checks.
 * Used by responsive specs and page-level assertions.
 */

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{ scrollWidth: number, clientWidth: number, hasHorizontalOverflow: boolean }>}
 */
async function getDocumentOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
    };
  });
}

/**
 * Assert no unexpected horizontal page scroll.
 * @param {import('@playwright/test').Page} page
 * @param {number} [tolerancePx]
 */
async function assertNoHorizontalOverflow(page, tolerancePx = 1) {
  const { expect } = require('@playwright/test');
  const result = await page.evaluate((tolerance) => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    return { overflow, scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, tolerance };
  }, tolerancePx);

  expect(
    result.overflow,
    `Unexpected horizontal overflow: scrollWidth=${result.scrollWidth}, clientWidth=${result.clientWidth}`,
  ).toBeLessThanOrEqual(tolerancePx);
}

/**
 * Elements whose bounding box extends past the viewport horizontally.
 * @param {import('@playwright/test').Page} page
 * @param {string} [selector]
 */
async function findHorizontallyOverflowingElements(page, selector = 'body *') {
  return page.evaluate((sel) => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll(sel)) {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      if (rect.right > vw + 2 || rect.left < -2) {
        offenders.push({
          tag: el.tagName,
          className: (el.className || '').toString().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          text: (el.textContent || '').trim().slice(0, 40),
        });
      }
      if (offenders.length >= 15) break;
    }
    return offenders;
  }, selector);
}

/**
 * Check whether a locator's box intersects the viewport.
 * @param {import('@playwright/test').Locator} locator
 */
async function isInViewport(locator) {
  return locator.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw;
  });
}

/**
 * Detect truncated text via scrollWidth vs clientWidth on text nodes' parents.
 * @param {import('@playwright/test').Locator} locator
 */
async function isTextVisuallyCutOff(locator) {
  return locator.evaluate((el) => {
    const style = window.getComputedStyle(el);
    if (style.overflow === 'hidden' || style.textOverflow === 'ellipsis') {
      return el.scrollWidth > el.clientWidth + 1;
    }
    return false;
  });
}

module.exports = {
  getDocumentOverflow,
  assertNoHorizontalOverflow,
  findHorizontallyOverflowingElements,
  isInViewport,
  isTextVisuallyCutOff,
};
