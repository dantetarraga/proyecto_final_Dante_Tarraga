import { test as base, type BrowserContextOptions } from '@playwright/test';
import { defaultCustomer } from '../data/customers';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductPage } from '../pages/ProductPage';

type StorageState = Exclude<BrowserContextOptions['storageState'], string | undefined>;

type Fixtures = {
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
  productListPage: ProductListPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  loggedIn: void;
  checkoutWithProduct: CheckoutPage;
};

type WorkerFixtures = {
  customerSession: StorageState;
};

export const test = base.extend<Fixtures, WorkerFixtures>({
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
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },

  customerSession: [
    async ({ browser }, use, workerInfo) => {
      const context = await browser.newContext({ ...workerInfo.project.use });
      const page = await context.newPage();
      const loginPage = new LoginPage(page);
      const myAccountPage = new MyAccountPage(page);

      await loginPage.goto();
      await loginPage.login(defaultCustomer.email, defaultCustomer.password);
      await myAccountPage.heading.filter({ hasText: defaultCustomer.fullName }).waitFor();

      const session = await context.storageState();
      await context.close();
      await use(session);
    },
    { scope: 'worker' },
  ],

  loggedIn: async ({ context, customerSession }, use) => {
    await context.addCookies(customerSession.cookies);
    await use();
  },

  checkoutWithProduct: async ({ loggedIn, cartPage, productPage, checkoutPage }, use) => {
    await cartPage.removeAll();
    await productPage.goto();
    await productPage.addToCart();
    await checkoutPage.goto();
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
