import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly heading: Locator;
  readonly details: Locator;
  readonly reference: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.details = page.locator('.order-confirmation__details-list');
    this.reference = this.details.getByText(/^Order reference: [A-Z]{9}$/);
    this.products = page.locator('.order-confirmation__product-title');
  }

  detail(label: 'Payment method' | 'Shipping method'): Locator {
    return this.details.getByRole('listitem').filter({ hasText: `${label}:` });
  }

  amount(label: 'Subtotal' | 'Shipping and handling' | 'Total'): Locator {
    return this.page
      .locator('.order-confirmation__line')
      .filter({ has: this.page.locator('.order-confirmation__line-label', { hasText: new RegExp(`^${label}`) }) })
      .locator('.order-confirmation__line-value');
  }
}
