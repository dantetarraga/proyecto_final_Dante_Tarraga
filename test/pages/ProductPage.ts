import type { Locator, Page } from '@playwright/test';
import { hummingbirdTShirt, type ProductVariant } from '../data/products';

export class ProductPage {
  readonly name: Locator;
  readonly sizeSelect: Locator;
  readonly colorOptions: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly cartModal: Locator;

  constructor(private readonly page: Page) {
    this.name = page.getByRole('heading', { level: 1 });
    this.sizeSelect = page.getByRole('combobox', { name: 'Size' });
    this.colorOptions = page.getByRole('radiogroup', { name: 'Color' });
    this.quantityInput = page.getByRole('textbox', { name: /Change quantity/ });
    this.addToCartButton = page.getByRole('button', { name: /Add to cart/ });
    this.cartBadge = page.locator('.blockcart .header-block__badge');
    this.cartModal = page.getByRole('dialog', { name: 'Added to your cart' });
  }

  async goto() {
    await this.page.goto(hummingbirdTShirt.path);
  }

  async selectSize(size: ProductVariant['size']) {
    await this.sizeSelect.selectOption({ label: size });
    await this.page.waitForURL(new RegExp(`size-${size.toLowerCase()}`));
  }

  async selectColor(color: ProductVariant['color']) {
    await this.colorOptions.locator('label', { hasText: `Color - ${color}` }).click();
    await this.page.waitForURL(new RegExp(`color-${color.toLowerCase()}`));
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(variant?: ProductVariant) {
    if (variant) {
      await this.selectSize(variant.size);
      await this.selectColor(variant.color);
      await this.setQuantity(variant.quantity);
    }
    await this.addToCartButton.click();
    await this.cartModal.waitFor();
  }
}
