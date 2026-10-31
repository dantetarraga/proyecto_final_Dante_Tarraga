import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartBadge = page.locator('.blockcart .header-block__badge');
  }

  accountMenu(fullName: string): Locator {
    return this.page.getByRole('button', { name: `View my account (${fullName})` });
  }
}
