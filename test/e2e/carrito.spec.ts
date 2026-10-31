import { defaultCustomer } from '../data/customers';
import { hummingbirdTShirt, type ProductVariant } from '../data/products';
import { expect, test } from '../fixtures';

test.describe('Agregar al carrito', () => {
  test.describe('como visitante', () => {
    test.beforeEach(async ({ productPage }) => {
      await productPage.goto();
      await expect(productPage.name).toHaveText(hummingbirdTShirt.name);
    });

    test('agrega el producto con la variante por defecto', { tag: '@smoke' }, async ({ productPage }) => {
      await productPage.addToCart();

      const { cartModal } = productPage;
      await expect(cartModal.productName).toHaveText(hummingbirdTShirt.name);
      await expect(cartModal.quantity).toContainText('1');
      await expect(productPage.header.cartBadge).toHaveText('1');
    });

    test('agrega una variante elegida con varias unidades', async ({ productPage }) => {
      const variant: ProductVariant = { size: 'M', color: 'Black', quantity: 2 };

      await productPage.addToCart(variant);

      const { cartModal } = productPage;
      await expect(cartModal.size).toContainText(variant.size);
      await expect(cartModal.color).toContainText(variant.color);
      await expect(cartModal.quantity).toContainText(String(variant.quantity));
      await expect(productPage.header.cartBadge).toHaveText(String(variant.quantity));
    });
  });

  test.describe('con sesión iniciada', () => {
    test.beforeEach(async ({ loggedIn, productPage }) => {
      await productPage.goto();
    });

    test('agrega el producto y lo muestra en la página del carrito', { tag: '@smoke' }, async ({
      page,
      productPage,
      cartPage,
    }) => {
      await expect(productPage.header.accountMenu(defaultCustomer.fullName)).toBeVisible();

      await productPage.addToCart();
      await productPage.cartModal.proceedToCheckout();

      await expect(page).toHaveURL(/\/cart\?action=show/);
      await expect(cartPage.heading).toBeVisible();
      await expect(cartPage.item(hummingbirdTShirt.name)).toBeVisible();
      await expect(cartPage.item(hummingbirdTShirt.name)).toContainText(hummingbirdTShirt.unitPrice);
    });
  });
});
