const { env } = require('../config/env');

/**
 * Link collection and HTTP validation helpers.
 */

/**
 * @param {string} href
 * @param {string} [baseUrl]
 */
function classifyLink(href, baseUrl = env.baseURL) {
  if (!href || href.startsWith('javascript:') || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return 'ignored';
  }
  try {
    const absolute = new URL(href, baseUrl);
    const base = new URL(baseUrl);
    if (absolute.hostname === base.hostname) return 'internal';
    return 'external';
  } catch {
    return 'invalid';
  }
}

/**
 * Collect unique hrefs from the page.
 * @param {import('@playwright/test').Page} page
 * @param {{ scope?: import('@playwright/test').Locator }} [options]
 */
async function collectLinks(page, options = {}) {
  const root = options.scope || page.locator('body');
  const hrefs = await root.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((a) => ({
      href: a.getAttribute('href') || '',
      text: (a.textContent || '').trim().slice(0, 80),
    })),
  );

  const seen = new Set();
  const unique = [];
  for (const item of hrefs) {
    if (!item.href || seen.has(item.href)) continue;
    seen.add(item.href);
    unique.push({
      ...item,
      type: classifyLink(item.href),
      absoluteUrl: (() => {
        try {
          return new URL(item.href, env.baseURL).toString();
        } catch {
          return item.href;
        }
      })(),
    });
  }
  return unique;
}

/**
 * HEAD/GET status check. External links use GET with short timeout; failures are reported, not always fail-hard.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} url
 */
async function checkLinkStatus(request, url) {
  try {
    let response = await request.fetch(url, {
      method: 'HEAD',
      maxRedirects: 5,
      timeout: 15_000,
      failOnStatusCode: false,
    });

    // Some hosts reject HEAD
    if (response.status() === 405 || response.status() === 403 || response.status() === 501) {
      response = await request.fetch(url, {
        method: 'GET',
        maxRedirects: 5,
        timeout: 15_000,
        failOnStatusCode: false,
      });
    }

    return {
      url,
      status: response.status(),
      ok: response.ok() || (response.status() >= 200 && response.status() < 400),
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

/**
 * Validate a list of links; returns broken entries.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {Array<{ absoluteUrl: string, type: string, href: string, text: string }>} links
 * @param {{ includeExternal?: boolean, concurrency?: number }} [options]
 */
async function findBrokenLinks(request, links, options = {}) {
  const { includeExternal = false, concurrency = 5 } = options;
  const targets = links.filter((l) => {
    if (l.type === 'ignored' || l.type === 'invalid') return false;
    if (l.type === 'external' && !includeExternal) return false;
    return true;
  });

  const broken = [];
  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    const results = await Promise.all(batch.map((l) => checkLinkStatus(request, l.absoluteUrl)));
    for (let j = 0; j < results.length; j += 1) {
      if (!results[j].ok) {
        broken.push({ ...batch[j], ...results[j] });
      }
    }
  }
  return broken;
}

module.exports = {
  classifyLink,
  collectLinks,
  checkLinkStatus,
  findBrokenLinks,
};
