import { expect, test } from '@playwright/test';
import { hummingbirdTShirt, type ProductVariant } from '../data/products';
import { ProductPage } from '../pages/ProductPage';

test.describe('Agregar al carrito', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
    await expect(productPage.name).toHaveText(hummingbirdTShirt.name);
  });

  test('agrega el producto con la variante por defecto', async () => {
    await productPage.addToCart();

    await expect(productPage.cartModal).toContainText(hummingbirdTShirt.name);
    await expect(productPage.cartModal).toContainText('Quantity: 1');
    await expect(productPage.cartBadge).toHaveText('1');
  });

  test('agrega una variante elegida con varias unidades', async () => {
    const variant: ProductVariant = { size: 'M', color: 'Black', quantity: 2 };

    await productPage.addToCart(variant);

    await expect(productPage.cartModal).toContainText(`Size: ${variant.size}`);
    await expect(productPage.cartModal).toContainText(`Color: ${variant.color}`);
    await expect(productPage.cartModal).toContainText(`Quantity: ${variant.quantity}`);
    await expect(productPage.cartBadge).toHaveText(String(variant.quantity));
  });
});
