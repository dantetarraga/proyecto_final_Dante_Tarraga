import { defaultCustomer, wrongPassword } from '../data/customers';
import { expect, test } from '../fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
  });

  test('inicia sesión con credenciales válidas', { tag: '@smoke' }, async ({
    page,
    loginPage,
    myAccountPage,
  }) => {
    await loginPage.login(defaultCustomer.email, defaultCustomer.password);

    await expect(page).toHaveURL(/\/my-account$/);
    await expect(myAccountPage.heading).toHaveText(`Welcome ${defaultCustomer.fullName}`);
    await expect(myAccountPage.header.accountMenu(defaultCustomer.fullName)).toBeVisible();
  });

  test('rechaza una contraseña incorrecta', async ({ page, loginPage }) => {
    await loginPage.login(defaultCustomer.email, wrongPassword);

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.errorAlert).toHaveText('Authentication failed.');
    await expect(loginPage.header.accountMenu(defaultCustomer.fullName)).toBeHidden();
  });
});
