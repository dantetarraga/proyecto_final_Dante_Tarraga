import type { Locator, Page } from '@playwright/test';

export class CartModalComponent {
  readonly root: Locator;
  readonly productName: Locator;
  readonly size: Locator;
  readonly color: Locator;
  readonly quantity: Locator;
  readonly proceedToCheckoutLink: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog', { name: 'Added to your cart' });
    this.productName = this.root.locator('.blockcart-modal__name');
    this.size = this.root.locator('.blockcart-modal__property.size');
    this.color = this.root.locator('.blockcart-modal__property.color');
    this.quantity = this.root.locator('.blockcart-modal__quantity');
    this.proceedToCheckoutLink = this.root.getByRole('link', { name: 'Proceed to checkout' });
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutLink.click();
  }
}
