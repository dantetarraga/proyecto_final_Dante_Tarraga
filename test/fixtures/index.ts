import { test as base } from '@playwright/test';
import { defaultCustomer } from '../data/customers';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ProductPage } from '../pages/ProductPage';

type Fixtures = {
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
  loggedIn: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loggedIn: async ({ loginPage, myAccountPage }, use) => {
    await loginPage.goto();
    await loginPage.login(defaultCustomer.email, defaultCustomer.password);
    await myAccountPage.heading.filter({ hasText: defaultCustomer.fullName }).waitFor();
    await use();
  },
});

export { expect } from '@playwright/test';
