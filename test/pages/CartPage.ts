import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Shopping Cart' });
    this.items = page.locator('.js-cart-item');
  }

  async goto() {
    await this.page.goto('/cart?action=show');
  }

  item(productName: string): Locator {
    return this.items.filter({ hasText: productName });
  }
}
