const base = require('@playwright/test');
const { env } = require('../config/env');

// Public pages
const { HomePage } = require('../pages/public/HomePage');
const { ProjectsPage } = require('../pages/public/ProjectsPage');
const { MarketplacePage } = require('../pages/public/MarketplacePage');
const { AboutPage } = require('../pages/public/AboutPage');
const { ProjectDetailsPage } = require('../pages/public/ProjectDetailsPage');

// Auth pages
const { LoginPage } = require('../pages/auth/LoginPage');
const { SignUpPage } = require('../pages/auth/SignUpPage');
const { ForgotPasswordPage } = require('../pages/auth/ForgotPasswordPage');

// Dashboard pages
const { DashboardPage } = require('../pages/dashboard/DashboardPage');
const { PortfolioPage } = require('../pages/dashboard/PortfolioPage');
const { PortfolioDetailsPage } = require('../pages/dashboard/PortfolioDetailsPage');
const { MyListingsPage } = require('../pages/dashboard/MyListingsPage');
const { WishlistPage } = require('../pages/dashboard/WishlistPage');
const { FundsPage } = require('../pages/dashboard/FundsPage');
const { ReferralRewardsPage } = require('../pages/dashboard/ReferralRewardsPage');
const { SupportPage } = require('../pages/dashboard/SupportPage');
const { SupportTicketsPage } = require('../pages/dashboard/SupportTicketsPage');
const { TransactionsPage } = require('../pages/dashboard/TransactionsPage');
const { ProfilePage } = require('../pages/dashboard/ProfilePage');

/**
 * Shared test setup.
 * - Saves the cookie Accept choice so the banner does not block clicks.
 * - Gives every test ready-made page objects (homePage, loginPage, etc.).
 */
const test = base.test.extend({
  context: async ({ context }, use) => {
    // This cookie means "user already accepted cookies" on staging
    const baseUrl = new URL(env.baseURL);
    await context.addCookies([
      {
        name: 'aungsha_cookie_consent',
        value: 'accepted',
        domain: baseUrl.hostname,
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax',
      },
    ]);
    await use(context);
  },

  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  projectsPage: async ({ page }, use) => { await use(new ProjectsPage(page)); },
  marketplacePage: async ({ page }, use) => { await use(new MarketplacePage(page)); },
  aboutPage: async ({ page }, use) => { await use(new AboutPage(page)); },
  projectDetailsPage: async ({ page }, use) => { await use(new ProjectDetailsPage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  signUpPage: async ({ page }, use) => { await use(new SignUpPage(page)); },
  forgotPasswordPage: async ({ page }, use) => { await use(new ForgotPasswordPage(page)); },
  dashboardPage: async ({ page }, use) => { await use(new DashboardPage(page)); },
  portfolioPage: async ({ page }, use) => { await use(new PortfolioPage(page)); },
  portfolioDetailsPage: async ({ page }, use) => { await use(new PortfolioDetailsPage(page)); },
  myListingsPage: async ({ page }, use) => { await use(new MyListingsPage(page)); },
  wishlistPage: async ({ page }, use) => { await use(new WishlistPage(page)); },
  fundsPage: async ({ page }, use) => { await use(new FundsPage(page)); },
  referralRewardsPage: async ({ page }, use) => { await use(new ReferralRewardsPage(page)); },
  supportPage: async ({ page }, use) => { await use(new SupportPage(page)); },
  supportTicketsPage: async ({ page }, use) => { await use(new SupportTicketsPage(page)); },
  transactionsPage: async ({ page }, use) => { await use(new TransactionsPage(page)); },
  profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },
});

const { expect } = base;

module.exports = { test, expect };
