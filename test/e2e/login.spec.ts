import { expect, test } from '@playwright/test';
import { defaultCustomer, wrongPassword } from '../data/customers';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
  });

  test('inicia sesión con credenciales válidas', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);

    await loginPage.login(defaultCustomer.email, defaultCustomer.password);

    await expect(page).toHaveURL(/\/my-account$/);
    await expect(myAccountPage.heading).toHaveText(`Welcome ${defaultCustomer.fullName}`);
  });

  test('rechaza una contraseña incorrecta', async ({ page }) => {
    await loginPage.login(defaultCustomer.email, wrongPassword);

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.errorAlert).toHaveText('Authentication failed.');
  });
});
