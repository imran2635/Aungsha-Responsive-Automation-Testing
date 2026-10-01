const { test, expect } = require('../../fixtures/test.fixture');

test.describe('Buttons & primary CTAs', () => {
  test('homepage primary buttons/links are enabled and actionable', async ({ homePage }) => {
    await homePage.open();

    const { explore, signUp } = await homePage.getPrimaryCtas();
    await expect(explore).toBeVisible();
    await expect(signUp).toBeVisible();
    await expect(explore).toHaveAttribute('href', /projects/i);
    await expect(signUp).toHaveAttribute('href', /sign-up/i);
  });

  test('support menu button is present', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.supportMenuButton).toBeVisible();
  });

  test('footer newsletter accepts email input', async ({ homePage }) => {
    await homePage.open();
    await homePage.footer.scrollIntoView();
    await expect(homePage.footer.newsletterInput).toBeVisible();
    await homePage.footer.newsletterInput.fill('qa@example.com');
    await expect(homePage.footer.newsletterInput).toHaveValue('qa@example.com');
    await expect(homePage.footer.subscribeButton).toBeVisible();
  });
});
