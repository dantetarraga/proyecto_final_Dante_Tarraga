import { browserBlockedLogins, defaultCustomer, serverRejectedLogins } from '../data/customers';
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

  for (const { id, title, email, password } of serverRejectedLogins) {
    test(`${id}: rechaza ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(email ?? defaultCustomer.email, password ?? defaultCustomer.password);

      await expect(page).toHaveURL(/\/login/);
      await expect(loginPage.errorAlert).toHaveText('Authentication failed.');
      await expect(loginPage.header.accountMenu(defaultCustomer.fullName)).toBeHidden();
    });
  }

  for (const { id, title, email, password, invalidField, validity } of browserBlockedLogins) {
    test(`${id}: el navegador bloquea el envío con ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(email ?? defaultCustomer.email, password ?? defaultCustomer.password);

      const field = invalidField === 'email' ? loginPage.emailInput : loginPage.passwordInput;
      await expect(field).toHaveJSProperty(`validity.${validity}`, true);
      await expect(page).toHaveURL(/\/login/);
      await expect(loginPage.errorAlert).toBeHidden();
    });
  }
});

test.describe('Sesión guardada', () => {
  test('abre Mi cuenta sin pasar por el formulario de login', async ({ loggedIn, page, myAccountPage }) => {
    await page.goto('/my-account');

    await expect(page).toHaveURL(/\/my-account$/);
    await expect(myAccountPage.heading).toHaveText(`Welcome ${defaultCustomer.fullName}`);
  });
});
