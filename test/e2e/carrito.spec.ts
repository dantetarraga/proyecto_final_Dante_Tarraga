import { expect, test } from '@playwright/test';

test.describe('Agregar al carrito', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/1-1-hummingbird-printed-t-shirt.html');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hummingbird printed t-shirt');
  });

  test('agrega el producto con la variante por defecto', async ({ page }) => {
    await page.getByRole('button', { name: /Add to cart/ }).click();

    const modal = page.getByRole('dialog', { name: 'Added to your cart' });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Hummingbird printed t-shirt');
    await expect(modal).toContainText('Quantity: 1');
    await expect(page.locator('.blockcart .header-block__badge')).toHaveText('1');
  });
});
