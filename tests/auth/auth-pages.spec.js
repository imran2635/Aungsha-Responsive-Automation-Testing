const { test, expect } = require('../../fixtures/test.fixture');
const { users, hasValidCredentials } = require('../../test-data/users');
const { publicPages } = require('../../test-data/pages');

/**
 * Auth pages — Screenshots 090344–090438 (Sign up / Sign in / Forgot password).
 */
test.describe('Auth pages — screenshot map', () => {
  test('Sign-in page tabs and controls (090418)', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await expect(loginPage.phoneTab).toBeVisible();
    await expect(loginPage.emailTab).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('Email tab reveals email field', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.selectEmailTab();
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('Empty login stays on sign-in', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectEmptySubmitKeepsOnPage();
  });

  test('Create account goes to sign-up', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.clickCreateAccount();
    await expect(page).toHaveURL(publicPages.signUp.url);
  });

  test('Forgot password link navigates (090430)', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(publicPages.forgotPassword.url);
  });

  test('Sign-up page loads with Full Name (090344)', async ({ signUpPage }) => {
    await signUpPage.open();
    await signUpPage.expectLoaded();
  });

  test('Forgot password email tab (090438)', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.open();
    await forgotPasswordPage.expectLoaded();
    await forgotPasswordPage.selectEmailTab();
    await expect(forgotPasswordPage.emailInput).toBeVisible();
  });

  test('Valid login when credentials configured', async ({ loginPage }) => {
    // Skip unless .env has AUNGSHA_EMAIL / AUNGSHA_PASSWORD — avoids false failures
    test.skip(!hasValidCredentials(), 'Set AUNGSHA_EMAIL and AUNGSHA_PASSWORD in .env');
    await loginPage.loginWithEmail(users.valid.email, users.valid.password);
  });
});
