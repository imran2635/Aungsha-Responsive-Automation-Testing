const { devices } = require('@playwright/test');

/**
 * Central viewport / device matrix for data-driven responsive tests.
 * Keep one source of truth — do not duplicate sizes in specs.
 */
const VIEWPORTS = Object.freeze({
  mobile: [
    { name: 'mobile-375', width: 375, height: 667, isMobile: true, hasTouch: true },
    { name: 'mobile-390', width: 390, height: 844, isMobile: true, hasTouch: true },
    { name: 'mobile-414', width: 414, height: 896, isMobile: true, hasTouch: true },
    {
      name: 'mobile-android',
      ...devices['Pixel 7'],
      isMobile: true,
    },
    {
      name: 'mobile-iphone',
      ...devices['iPhone 14'],
      isMobile: true,
    },
  ],
  tablet: [
    { name: 'tablet-768', width: 768, height: 1024, isMobile: true, hasTouch: true },
    {
      name: 'tablet-ipad',
      ...devices['iPad Pro 11'],
      isMobile: true,
    },
  ],
  desktop: [
    { name: 'desktop-1366', width: 1366, height: 768, isMobile: false, hasTouch: false },
    { name: 'desktop-1920', width: 1920, height: 1080, isMobile: false, hasTouch: false },
  ],
});

/** Flat list for data-driven loops */
const ALL_VIEWPORTS = Object.freeze([
  ...VIEWPORTS.mobile,
  ...VIEWPORTS.tablet,
  ...VIEWPORTS.desktop,
]);

/** Breakpoint used by Aungsha layout (bottom Menu vs top nav) */
const MOBILE_NAV_MAX_WIDTH = 1023;

const isMobileLike = (viewport) => {
  if (viewport.isMobile === true) return true;
  const width = viewport.viewport?.width ?? viewport.width;
  return typeof width === 'number' && width <= MOBILE_NAV_MAX_WIDTH;
};

module.exports = {
  VIEWPORTS,
  ALL_VIEWPORTS,
  MOBILE_NAV_MAX_WIDTH,
  isMobileLike,
};
