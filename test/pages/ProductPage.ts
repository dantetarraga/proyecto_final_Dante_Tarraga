import type { Locator, Page } from '@playwright/test';
import { CartModalComponent } from '../components/CartModalComponent';
import { hummingbirdTShirt, type ProductVariant } from '../data/products';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly cartModal: CartModalComponent;
  readonly name: Locator;
  readonly sizeSelect: Locator;
  readonly colorOptions: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartModal = new CartModalComponent(page);
    this.name = page.getByRole('heading', { level: 1 });
    this.sizeSelect = page.getByRole('combobox', { name: 'Size' });
    this.colorOptions = page.getByRole('radiogroup', { name: 'Color' });
    this.quantityInput = page.getByRole('textbox', { name: /Change quantity/ });
    this.addToCartButton = page.getByRole('button', { name: /Add to cart/ });
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
    await this.cartModal.root.waitFor();
  }
}
