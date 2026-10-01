const { test, expect } = require('../../fixtures/test.fixture');
const { users, hasValidCredentials } = require('../../test-data/users');

/**
 * Dashboard pages — Screenshots 090112–090301.
 * All require an authenticated session; suite skips when credentials are missing.
 */
test.describe('Dashboard pages — screenshot map', () => {
  test.beforeEach(async ({ loginPage }) => {
    test.skip(!hasValidCredentials(), 'Set AUNGSHA_EMAIL and AUNGSHA_PASSWORD in .env');
    await loginPage.loginWithEmail(users.valid.email, users.valid.password);
  });

  test('Dashboard greeting and activity (090112)', async ({ dashboardPage }) => {
    await dashboardPage.open();
    await dashboardPage.expectLoaded();
  });

  test('My Portfolio search (090125)', async ({ portfolioPage }) => {
    await portfolioPage.open();
    await portfolioPage.expectLoaded();
  });

  test('My Listings page (090134)', async ({ myListingsPage }) => {
    await myListingsPage.open();
    await myListingsPage.expectLoaded();
  });

  test('Wishlist page (090141)', async ({ wishlistPage }) => {
    await wishlistPage.open();
    await wishlistPage.expectLoaded();
  });

  test('Funds balance + history (090151)', async ({ fundsPage }) => {
    await fundsPage.open();
    await fundsPage.expectLoaded();
  });

  test('Funds Withdraw opens Select Payment Method modal (092028)', async ({ fundsPage }) => {
    // Screenshot 092028: modal with bKash methods, + Add New Method, Continue
    await fundsPage.open();
    await fundsPage.openWithdrawPaymentMethodModal();
    await expect(fundsPage.paymentMethodModal.addNewMethodButton.first()).toBeVisible();
    await expect(fundsPage.paymentMethodModal.continueButton.first()).toBeVisible();
    // Close without withdrawing so the test stays non-destructive
    await fundsPage.paymentMethodModal.close();
  });

  test('Referral Rewards share UI (090158)', async ({ referralRewardsPage }) => {
    await referralRewardsPage.open();
    await referralRewardsPage.expectLoaded();
  });

  test('Support hub (090206)', async ({ supportPage }) => {
    await supportPage.open();
    await supportPage.expectLoaded();
  });

  test('Support tickets list (090219)', async ({ supportTicketsPage }) => {
    await supportTicketsPage.open();
    await supportTicketsPage.expectLoaded();
  });

  test('Transactions list (090228)', async ({ transactionsPage }) => {
    await transactionsPage.open();
    await transactionsPage.expectLoaded();
  });

  test('My Profile contact info (090247)', async ({ profilePage }) => {
    await profilePage.open();
    await profilePage.expectLoaded();
  });

  test('Sidebar menu order matches screenshot', async ({ dashboardPage }) => {
    // Same order as the red-box sidebar: Home → … → My Profile
    await dashboardPage.open();
    await dashboardPage.sidebar.expectVisible();
    await dashboardPage.sidebar.expectMenuOrder();
  });

  test('Sidebar can open Funds from Dashboard', async ({ dashboardPage, page }) => {
    await dashboardPage.open();
    await dashboardPage.sidebar.goToFunds();
    await expect(page).toHaveURL(/\/en\/dashboard\/my-points/);
  });
});
