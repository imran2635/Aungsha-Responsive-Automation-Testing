const path = require('path');
const { defineConfig, devices } = require('@playwright/test');
const { env } = require('./config/env');
const { VIEWPORTS } = require('./config/viewports');

const reportsDir = path.join(__dirname, 'reports');

function projectFromViewport(vp) {
  const use = {};

  if (vp.userAgent && vp.viewport) {
    Object.assign(use, {
      userAgent: vp.userAgent,
      viewport: vp.viewport,
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      defaultBrowserType: vp.defaultBrowserType,
    });
  } else {
    Object.assign(use, {
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.hasTouch,
    });
  }

  return {
    name: vp.name,
    testMatch: /tests[\\/]responsive[\\/].*\.spec\.js/,
    use,
  };
}

const responsiveProjects = [
  ...VIEWPORTS.mobile,
  ...VIEWPORTS.tablet,
  ...VIEWPORTS.desktop,
].map(projectFromViewport);

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: env.retries,
  workers: env.workers,
  timeout: env.defaultTimeout,
  expect: { timeout: env.expectTimeout },
  outputDir: path.join(reportsDir, 'test-results'),
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(reportsDir, 'html'), open: 'never' }],
  ],
  use: {
    baseURL: env.baseURL,
    headless: env.headless,
    actionTimeout: env.defaultTimeout,
    navigationTimeout: env.navigationTimeout,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: env.slowMo,
    },
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /tests[\\/]responsive[\\/]/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chrome',
      testIgnore: /tests[\\/]responsive[\\/]/,
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'edge',
      testIgnore: /tests[\\/]responsive[\\/]/,
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'firefox',
      testIgnore: /tests[\\/]responsive[\\/]/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: /tests[\\/]responsive[\\/]/,
      use: { ...devices['Desktop Safari'] },
    },
    ...responsiveProjects,
  ],
});
