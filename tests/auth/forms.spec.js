const { test, expect } = require('../../fixtures/test.fixture');
const { FormComponent } = require('../../components/shared/FormComponent');

test.describe('Forms — newsletter & login validation', () => {
  test('newsletter form rejects empty email via disabled submit', async ({ homePage }) => {
    await homePage.open();
    await homePage.footer.scrollIntoView();
    await expect(homePage.footer.newsletterInput).toBeVisible();
    await expect(homePage.footer.subscribeButton).toBeDisabled();
  });

  test('newsletter accepts a well-formed email', async ({ homePage }) => {
    await homePage.open();
    await homePage.footer.scrollIntoView();
    const form = new FormComponent(homePage.page, homePage.footer.root);
    await form.fillField(homePage.footer.newsletterInput, 'newsletter-qa@example.com');
    await expect(homePage.footer.subscribeButton).toBeVisible();
  });

  test('login password field is type password', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.form.expectInputType(loginPage.passwordInput, 'password');
  });
});
