import { expect, test } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login?back=my-account');
    await expect(page.getByRole('heading', { level: 1, name: 'Sign in' })).toBeVisible();
  });

  test('inicia sesión con credenciales válidas', async ({ page }) => {
    const form = page.locator('#login-form');

    await form.getByRole('textbox', { name: 'Email' }).fill(process.env.CUSTOMER_EMAIL!);
    await form.getByRole('textbox', { name: 'Password' }).fill(process.env.CUSTOMER_PASSWORD!);
    await form.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(/\/my-account$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      `Welcome ${process.env.CUSTOMER_NAME}`,
    );
  });
});
